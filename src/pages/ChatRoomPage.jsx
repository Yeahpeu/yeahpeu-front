// src/pages/ChatRoomPage.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRoomMessages, useProfile } from "../api/chatAPI";
import { useChatStore } from "../stores/chatStore";
import ChatHeader from "../components/Chat/Chatheader";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import { useStompClient } from "../api/ws/useStompClient";
import MyConfirm from "../components/Modals/MyConfirm";
import { useLeaveRoom } from "../api/chatAPI";
import imageCompression from "browser-image-compression";
import { useSendFile, useGetChatUsers } from "../api/chatAPI";
import MyLoading from "../components/common/MyLoading";
import MyAlert from "../components/Modals/MyAlert";
// 파일 형식 제한 상수
const ACCEPTED_FILE_TYPES =
  "image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/webp," +
  "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/x-hwp,text/plain," +
  "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv," +
  "application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";

const ChatRoomPage = () => {
  const { roomId: urlRoomId } = useParams();
  const location = useLocation();
  const { mutate: leaveRoom } = useLeaveRoom();
  const sendFileMutation = useSendFile();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { data: userProfile } = useProfile();

  // 방 정보 관리
  const {
    roomId,
    chat,
    setChat,
    chatMessage,
    setChatMessage,
    setAttachment,
    resetChatMessage,
    userId,
    roomTitle,
    setRoomId,
    setRoomTitle,
    setUserId,
  } = useChatStore();

  // ws 를 활용한 방메시지 관리
  const { data: chatUsers } = useGetChatUsers(roomId);
  const {
    data: RoomMessages = { items: [] },
    isLoading,
    isError,
  } = useRoomMessages(roomId);

  // 메시지 상태를 단일 소스로 관리
  const [messages, setMessages] = useState([]);
  const lastMessageIdRef = useRef(null);

  // 웹소켓 연결 상태 관리
  const [isReady, setIsReady] = useState(false);

  // 스크롤 관련 상태 추가
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const isInitialLoadRef = useRef(true);

  // 메시지 컨테이너에 대한 ref 추가
  const messageContainerRef = useRef(null);

  // scrollToBottom 함수 수정
  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      // 강제로 레이아웃 재계산을 위한 지연
      requestAnimationFrame(() => {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      });
    }
  }, []);

  // 웹소켓 메시지 핸들러는 scrollToBottom 함수 선언 이후에 정의
  const handleIncomingMessage = useCallback(
    (newMessage) => {
      setMessages((prev) => {
        if (prev.some((msg) => msg.id === newMessage.id)) {
          return prev;
        }
        // 새 메시지가 내가 보낸 것이거나 스크롤이 하단에 있을 때만 자동 스크롤
        if (newMessage.senderId === userId || shouldScrollToBottom) {
          requestAnimationFrame(() => {
            requestAnimationFrame(scrollToBottom);
          });
        }
        return [...prev, newMessage];
      });
      lastMessageIdRef.current = newMessage.id;
    },
    [userId, shouldScrollToBottom, scrollToBottom]
  );

  // 초기 로딩 상태 추가
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // roomId URL 동기화 및 초기 설정 수정
  useEffect(() => {
    if (urlRoomId) {
      setRoomId(urlRoomId);
      if (location.state?.roomTitle) {
        setRoomTitle(location.state.roomTitle);
      }
      // 약간의 지연 후 ready 상태로 변경
      setTimeout(() => {
        setIsReady(true);
      }, 10);

      // 1초 후에 초기 로딩 상태 해제
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 100);
    }

    return () => {
      setIsReady(false);
      setMessages([]);
      lastMessageIdRef.current = null;
      setIsInitialLoading(true); // 컴포넌트 언마운트 시 초기화
    };
  }, [urlRoomId, location.state]);

  // WebSocket 연결 설정 - ready 상태일 때만
  const {
    sendMessage,
    isConnected,
    connect: connectWebSocket,
    disconnect: disconnectWebSocket,
  } = useStompClient(isReady ? roomId : null, handleIncomingMessage);

  // 메시지 전송 핸들러
  const handleSend = useCallback(
    (onComplete) => {
      const messageWithTime = {
        ...chatMessage,
        sentAt: new Date().toISOString(),
      };

      sendMessage(`/api/pub/chat/rooms/${roomId}`, messageWithTime);
      setChat("");
      resetChatMessage();

      // 메시지 전송 후 스크롤
      setTimeout(scrollToBottom, 100);

      if (onComplete) {
        onComplete();
      }
    },
    [
      chatMessage,
      roomId,
      sendMessage,
      setChat,
      resetChatMessage,
      scrollToBottom,
    ]
  );

  // 초기 메시지 로드 및 웹소켓 메시지 동기화
  useEffect(() => {
    if (RoomMessages?.items?.length > 0) {
      setMessages((prevMessages) => {
        const combinedMessages = [...prevMessages, ...RoomMessages.items];
        const uniqueMessages = Array.from(
          new Map(combinedMessages.map((msg) => [msg.id, msg])).values()
        ).sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));

        // 메시지가 로드된 후 스크롤 처리
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollToBottom);
        });

        return uniqueMessages;
      });

      const lastMessage = RoomMessages.items[RoomMessages.items.length - 1];
      if (lastMessage) {
        lastMessageIdRef.current = lastMessage.id;
      }
    }
  }, [RoomMessages?.items, scrollToBottom]);

  // userId 초기화 - 채팅방 입장 시 한 번만 실행
  useEffect(() => {
    if (userProfile?.id) {
      setUserId(userProfile.id);
    }
  }, [userProfile?.id]);

  // 채팅방 나가기
  const handleLeaveChat = useCallback(() => {
    // 웹소켓 연결 해제
    disconnectWebSocket();

    // 상태 초기화
    setChat("");
    setChatMessage("");
    setAttachment(null, null);
    setMessages([]);
    lastMessageIdRef.current = null;

    navigate(-1);
  }, [disconnectWebSocket, setChat, setChatMessage, setAttachment, navigate]);

  // 채팅방 떠나기 (퇴장)
  const handleDeleteChat = useCallback(() => {
    setShowConfirmModal(true);
  }, []);

  // 모달에서 "취소"를 누른 경우: 모달 닫기
  const handleCancel = useCallback(() => {
    setShowConfirmModal(false);
  }, []);

  const handleAlertClose = useCallback(() => {
    setAlertMessage("");
  }, []);

  // 모달에서 "확인"을 누른 경우: 채팅방 퇴장 처리
  const handleConfirm = useCallback(() => {
    setShowConfirmModal(false);

    // 웹소켓 연결 해제
    disconnectWebSocket();

    // 채팅방 퇴장 처리
    leaveRoom(roomId);

    // 상태 초기화
    setChat("");
    setChatMessage("");
    setAttachment(null, null);
    setMessages([]);
    lastMessageIdRef.current = null;

    navigate(-1);
  }, [
    disconnectWebSocket,
    leaveRoom,
    roomId,
    setChat,
    setChatMessage,
    setAttachment,
    navigate,
  ]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      disconnectWebSocket();
      setChat("");
      setChatMessage("");
      setAttachment(null, null);
      setMessages([]);
      lastMessageIdRef.current = null;
      setIsReady(false);
    };
  }, []);

  const [alertMessage, setAlertMessage] = useState("");

  // 파일명 자르기 함수 추가
  const truncateFileName = (fileName) => {
    const extension = fileName.split(".").pop();
    const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf("."));

    // 한글, 영문, 특수문자 등의 실제 길이 계산
    let visibleLength = 0;
    let truncatedName = "";

    for (let char of nameWithoutExt) {
      // 한글은 길이를 1로 취급
      const charLength = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char) ? 1 : 0.5;
      if (visibleLength + charLength > 10) break;
      truncatedName += char;
      visibleLength += charLength;
    }

    // 잘린 경우에만 '...' 추가
    const finalName =
      nameWithoutExt.length === truncatedName.length
        ? truncatedName
        : truncatedName + "...";

    return `${finalName}.${extension}`;
  };

  // handleAddFile 함수를 수정합니다
  const handleAddFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일명 길이 체크 (확장자 포함)
    if (file.name.length > 100) {
      setAlertMessage("파일명은 100자를 초과할 수 없습니다");
      event.target.value = ""; // 파일 입력 초기화
      setChat("");
      setChatMessage("");
      setAttachment(null, null);
      return Promise.reject();
    }

    // 파일 크기 체크 (20MB = 20 * 1024 * 1024 bytes)
    if (file.size > 20 * 1024 * 1024) {
      setAlertMessage("파일 크기는 20MB를 초과할 수 없습니다");
      event.target.value = ""; // 파일 입력 초기화
      setChat("");
      setChatMessage("");
      setAttachment(null, null);
      return Promise.reject();
    }

    try {
      let fileToUpload = file;
      // 이미지 파일인 경우에만 압축 적용
      if (file.type.startsWith("image/") && file.type !== "image/gif") {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        fileToUpload = new File([compressedFile], file.name, {
          type: file.type,
        });
      }

      // 파일 업로드
      const response = await sendFileMutation.mutateAsync(fileToUpload);

      // 수정된 파일명 자르기 로직 적용
      const truncatedFileName = truncateFileName(file.name);

      // 응답을 받은 후에 상태 업데이트
      setAttachment(response.url, response.contentType);
      setChatMessage({
        message: truncatedFileName,
        attachmentRequests: [
          {
            url: response.url,
            contentType: response.contentType,
          },
        ],
        sentAt: new Date().toISOString(),
      });
    } catch (error) {
      setAlertMessage("비정상적인 파일입니다");
      setChat("");
      setChatMessage("");
      setAttachment(null, null);
      return Promise.reject(error);
    }
  };

  // 날짜 포맷팅 함수 추가
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 시간 포맷팅 함수 추가
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // 메시지를 날짜별로 그룹화하는 함수
  const groupMessagesByDate = (messages) => {
    const groups = {};

    // 메시지를 timestamp 기준으로 정렬
    const sortedMessages = [...messages].sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );

    sortedMessages.forEach((message) => {
      const date = new Date(message.sentAt);
      const dateKey = formatDate(date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    return groups;
  };
  // 마지막으로 동기화된 메시지 ID를 저장하는 ref
  const syncedLastMessageIdRef = useRef(null);

  useEffect(() => {
    const updateLastSeenMessage = () => {
      if (messages.length === 0) return;

      const lastMessage = messages[messages.length - 1];

      // 이미 동기화된 메시지면 스킵
      if (syncedLastMessageIdRef.current === lastMessage.id) return;

      // 마지막 메시지 읽음 처리
      sendMessage(`/api/pub/chat/rooms/${roomId}/read`, {
        messageId: lastMessage.id,
      });

      syncedLastMessageIdRef.current = lastMessage.id;
    };

    // 1초마다 실행
    const intervalId = setInterval(updateLastSeenMessage, 500);

    return () => clearInterval(intervalId);
  }, [messages, roomId, sendMessage]);

  // 메시지 업데이트 감지 및 스크롤 처리
  useEffect(() => {
    if (!shouldScrollToBottom) return;

    const container = messageContainerRef.current;
    if (!container) return;

    const images = container.getElementsByTagName("img");
    let loadedImages = 0;
    const totalImages = images.length;

    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        scrollToBottom();
      }
    };

    if (totalImages === 0) {
      scrollToBottom();
    } else {
      Array.from(images).forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener("load", handleImageLoad);
        }
      });

      if (loadedImages === totalImages) {
        scrollToBottom();
      }
    }

    return () => {
      Array.from(images).forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, [messages, scrollToBottom, shouldScrollToBottom]);

  // 스크롤 위치 감지 및 자동 스크롤 제어
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldScrollToBottom(isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // 메시지 컨테이너 ref가 설정된 후 초기 스크롤
  useEffect(() => {
    if (messageContainerRef.current && messages.length > 0) {
      scrollToBottom();
    }
  }, [messageContainerRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div>
        <MyLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[430px] mx-auto bg-white h-screen relative">
      <ChatHeader
        roomTitle={roomTitle}
        onLeave={handleLeaveChat}
        onDelete={handleDeleteChat}
      />
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto px-4 pb-[68px]"
        style={{ height: "calc(100vh - 130px)" }}
      >
        {Object.entries(groupMessagesByDate(messages)).map(
          ([date, dateMessages]) => (
            <div key={date} className="flex flex-col pt-1 gap-2">
              <div className="flex justify-center">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {date}
                </span>
              </div>
              <ChatMessages messages={dateMessages} myId={userId} />
            </div>
          )
        )}
      </div>
      <ChatInput
        chat={chat}
        setChat={setChat}
        onSend={handleSend}
        onAddFile={handleAddFile}
        setChatMessage={setChatMessage}
        isUploading={sendFileMutation.isLoading}
        ACCEPTED_FILE_TYPES={ACCEPTED_FILE_TYPES}
      />

      {/* 초기 로딩 오버레이 */}
      {isInitialLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-50">
          <MyLoading />
        </div>
      )}

      <MyConfirm
        message="정말로 이 방을 떠나시겠습니까?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        optionLeft="머무르기"
        optionRight="탈퇴하기"
        visible={showConfirmModal}
      />
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert message={alertMessage} onConfirm={handleAlertClose} />
        </div>
      )}
    </div>
  );
};

export default ChatRoomPage;
