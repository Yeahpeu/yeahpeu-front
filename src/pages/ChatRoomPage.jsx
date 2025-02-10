// src/pages/ChatRoomPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomMessages } from "../api/chatAPI";
import { useChatStore } from "../stores/chatStore";
import ChatHeader from "../components/Chat/Chatheader";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import { useStompClient } from "../api/ws/useStompClient";
import MyConfirm from "../components/Modals/MyConfirm";
import { useLeaveRoom } from "../api/chatAPI";
import progressinGIF from "../assets/progressing.gif";
import imageCompression from "browser-image-compression";
import { useSendFile, useGetChatUsers } from "../api/chatAPI";

const ChatRoomPage = () => {
  const { mutate: leaveRoom } = useLeaveRoom();
  const sendFileMutation = useSendFile();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

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
  } = useChatStore();
  // ws 를 활용한 방메시지 관리
  const { data: chatUsers } = useGetChatUsers(roomId);
  const {
    data: RoomMessages = { items: [] },
    isLoading,
    isError,
  } = useRoomMessages(roomId);
  const [messages, setMessages] = useState(RoomMessages.items || []);

  // 채팅 메시지가 업데이트 될 때마다 로컬 상태 업데이트
  useEffect(() => {
    if (RoomMessages && RoomMessages.items) {
      // 기존 상태와 비교해서 다를 때만 업데이트
      if (JSON.stringify(messages) !== JSON.stringify(RoomMessages.items)) {
        setMessages(RoomMessages.items);
      }
    }
  }, [RoomMessages?.items]);

  // WebSocket을 통한 새 메시지 처리
  const handleIncomingMessage = useCallback(
    (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [setMessages]
  );

  const { sendMessage } = useStompClient(roomId, handleIncomingMessage);

  // 메시지 전송
  const handleSend = (onComplete) => {
    sendMessage(`/api/pub/chat/rooms/${roomId}`, chatMessage);
    setChat("");
    resetChatMessage();

    if (onComplete) {
      onComplete();
    }

    // 마지막 메시지 읽음 업데이트
    if (messages.length > 0) {
      const lastSeenMessage = { messageId: messages[messages.length - 1].id };
      sendMessage(`/api/pub/chat/rooms/${roomId}/read`, lastSeenMessage);
    }
  };

  //채팅방 나가기
  const handleLeaveChat = () => {
    navigate(-1);
  };

  //채팅방 떠나기
  const handleDeleteChat = () => {
    setShowConfirmModal(true);
  };

  // 모달에서 "확인"을 누른 경우: 채팅방으로 이동
  const handleConfirm = () => {
    setShowConfirmModal(false);
    //탈퇴처리
    leaveRoom(roomId);
    handleLeaveChat();
  };

  // 모달에서 "취소"를 누른 경우: 모달 닫기
  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleAddFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      let fileToUpload = file;
      // 이미지 파일인 경우에만 압축 적용
      if (file.type.startsWith("image/")) {
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

      // 응답을 받은 후에 상태 업데이트
      setAttachment(response.url, response.contentType);
      setChatMessage(file.name);
    } catch (error) {
      alert("파일 업로드에 실패했습니다.");
      setChat("");
      setChatMessage("");
      setAttachment(null, null);
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

  if (isLoading) {
    return (
      <div>
        <img src={progressinGIF} alt="로딩중....." />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        roomTitle={roomTitle}
        onLeave={handleLeaveChat}
        onDelete={handleDeleteChat}
      />
      <div className="flex-1 overflow-y-auto mt-16 px-8 pb-24">
        {Object.entries(groupMessagesByDate(messages)).map(
          ([date, dateMessages]) => (
            <div key={date} className="flex flex-col py-2 gap-2">
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
      />
      <MyConfirm
        message="정말로 이 방을 떠나시겠습니까?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        optionLeft="머무르기"
        optionRight="탈퇴하기"
        visible={showConfirmModal}
      />
    </div>
  );
};

export default ChatRoomPage;
