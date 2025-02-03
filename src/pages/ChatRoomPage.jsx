// ChatRoomPage.jsx
import React, { useState, useRef, useEffect } from "react";

import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs"; // stompjs 라이브러리 필요

import { useParams, useNavigate } from "react-router-dom";
import MyAddButton from "../components/common/MyAddButton";
import MyChatBox from "../components/Cards/MyChatbox";
import { useChatStore } from "../stores/chatStore";
import { motion } from "framer-motion";
import MyInputWhite from "../components/common/MyInput-white";
import MySendButton from "../components/common/MySendButton";

import { useRoomMessages } from "../api/chatAPI";

const ChatRoomPage = () => {
  const [stompClient, setStompClient] = useState(null);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { roomId, roomTitle, chat, setChat } = useChatStore();
  const {
    data: RoomMessages = [],
    isLoading,
    isError,
  } = useRoomMessages(roomId);

  const navigate = useNavigate();
  const [messages, setMessages] = useState(RoomMessages.items);

  useEffect(() => {
    // 새 메시지가 추가될 때마다 마지막 요소로 스크롤 이동
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (RoomMessages && RoomMessages.items) {
      setMessages(RoomMessages.items);
    }
  }, [RoomMessages]);

  // 컴포넌트가 마운트될 때 웹소켓 연결
  useEffect(() => {
    // SockJS 엔드포인트 (스프링 서버의 엔드포인트 URL에 맞게 수정)
    const socket = new SockJS("http://localhost:8080/api/ws");

    const client = over(socket);

    const getAuthToken = () => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
    };
    const token = getAuthToken();
    // STOMP 연결
    client.connect(
      {
        Authorization: `${token}`, // 헤더에 토큰 포함 (서버의 요구사항에 따라 형식 조정)
      },
      () => {
        console.log("Connected to WebSocket");
        // 예시: 서버에서 /topic/messages 구독 (필요한 경우)
        client.subscribe(`/api/sub/chat/rooms/${roomId}`, (msg) => {
          console.log("Received message:", msg.body);
          const parsedMessage = JSON.parse(msg.body);
          console.log(parsedMessage);
          console.log("======");
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          // 여기서 받은 메시지를 상태로 관리하거나 화면에 출력할 수 있습니다.
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      }
    );

    setStompClient(client);

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);

  // 메시지 전송 핸들러
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

    if (stompClient && stompClient.connected) {
      // /app/chat 는 서버에서 처리할 메시지 엔드포인트 (스프링에서 @MessageMapping("/chat") 등과 연동)
      stompClient.send(
        `/api/pub/chat/rooms/${roomId}`,
        {},
        JSON.stringify(chatMessage)
      );
      console.log("Message sent:", chatMessage);
      setChat(""); // 전송 후 입력창 초기화 (선택사항)

      // updateLastSeenMessage -> 확인이 필요합니다.
      const lastSeenMessage = { messageId: messages[messages.length - 1].id };
      stompClient.send(
        `/api/pub/chat/rooms/${roomId}/read`,
        {},
        JSON.stringify(lastSeenMessage)
      );
      console.log("Message sent:", lastSeenMessage);
    } else {
      console.log("WebSocket 연결이 되어 있지 않습니다.");
    }
  };

  if (isLoading) {
    // 여기에 로딩 프로그레싱 바 추가 필요 합니다.
    return <div>Loading...</div>;
  }

  //const { roomId } = useParams(); // URL에서 roomId 추출

  const myId = 10;

  const dummyChatMessage = {
    items: [
      {
        id: 1,
        roomId: 1,
        sender: {
          id: 4,
          nickname: "하늘",
        },
        message: "안녕, 다들 준비됐어?",
        sentAt: "2025-01-31T11:00:00.000Z",
        attachments: [{ url: "", contentType: "" }],
      },
    ],
  };

  // const dummyChatMessage = {

  // 나가기 버튼 클릭 시 이전 페이지로 이동
  const handleLeaveChat = () => {
    navigate(-1); // 이전 페이지로 돌아감
  };

  return (
    <div>
      <div className="p-5"></div>
      <div className="p-8 pt-10">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-3 grid grid-cols-3 items-center mb-3">
          <button
            onClick={handleLeaveChat}
            className="px-4 py-2 text-black rounded justify-self-start"
          >
            &lt;
          </button>

          <h2 className="text-xl font-bold text-center">{roomTitle}</h2>

          <div></div>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex flex-col overflow-y-auto mb-4"
        >
          {messages?.map((item) => (
            <div className="pb-3" key={item.id}>
              <MyChatBox
                owner={myId === item.sender.id ? "mine" : "others"}
                message={item.message}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-5"></div>
        <div className="fixed bottom-0 left-0 right-0 flex items-center p-4 bg-white">
          <MyInputWhite
            type="text"
            placeholder="채팅을 입력하세요"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            className="flex-grow"
          />
          <MySendButton className="ml-2" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
