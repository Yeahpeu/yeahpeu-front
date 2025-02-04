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

const ChatRoomPage = () => {
  const { mutate: leaveRoom, error } = useLeaveRoom();

  // back navaigate (뒤로가기)
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  // 방 정보 관리
  const { roomId, roomTitle, chat, setChat } = useChatStore();

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

  // ws 클라이언트 초기화
  const { sendMessage } = useStompClient(roomId, handleIncomingMessage);

  // 메시지 전송
  const handleSend = () => {
    const chatMessage = {
      message: chat,
      sentAt: new Date().toISOString(),
      attachmentRequests: [
        {
          url: "",
          contentType: "",
        },
      ],
    };
    sendMessage(`/api/pub/chat/rooms/${roomId}`, chatMessage);
    // 채팅input 초기화
    setChat("");

    // 마지막 메시지 읽음 업데이트
    if (messages.length > 0) {
      const lastSeenMessage = { messageId: messages[messages.length - 1].id };
      sendMessage(`/api/pub/chat/rooms/${roomId}/read`, lastSeenMessage);
      console.log("Read update sent:", lastSeenMessage);
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

  if (isLoading) {
    //로딩 프로세싱 (todo)
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading messages</div>;
  }

  const myId = 10;

  return (
    <div className="p-8 pt-10">
      <ChatHeader
        roomTitle={roomTitle}
        onLeave={handleLeaveChat}
        onDelete={handleDeleteChat}
      />
      <ChatMessages messages={messages} myId={myId} />
      <ChatInput chat={chat} setChat={setChat} onSend={handleSend} />
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
