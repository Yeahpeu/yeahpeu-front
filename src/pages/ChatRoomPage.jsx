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
import { useSendFile } from "../api/chatAPI";

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
  console.log("나의 유저아이디 : " + userId);
  // ws 를 활용한 방메시지 관리
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
    console.log("23=====");
    leaveRoom(roomId);
    console.log("23");
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
      console.log("파일 타입 : ", file.type);
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
          lastModified: new Date().getTime(),
        });
      }

      // 파일 업로드
      const response = await sendFileMutation.mutateAsync(fileToUpload);
      console.log("파일 업로드 응답:", response);

      // 응답을 받은 후에 상태 업데이트
      setAttachment(response.url, response.contentType);
      setChatMessage(file.name);
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      alert("파일 업로드에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div>
        <img src={progressinGIF} alt="로딩중....." />
      </div>
    );
  }

  return (
    <div className="p-8 pt-10">
      <ChatHeader
        roomTitle={roomTitle}
        onLeave={handleLeaveChat}
        onDelete={handleDeleteChat}
      />
      <ChatMessages messages={messages} myId={userId} />
      <ChatInput
        chat={chat}
        setChat={setChat}
        onSend={handleSend}
        onAddFile={handleAddFile}
        setChatMessage={setChatMessage}
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
