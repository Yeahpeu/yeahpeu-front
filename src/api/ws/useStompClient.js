// src/hooks/useStompClient.js
import { useState, useEffect } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

export const useStompClient = (roomId, onMessageReceived) => {
  const [stompClient, setStompClient] = useState(null);

  const BASE_URL = "https://i12a706.p.ssafy.io";

  console.log("BASE_URL:", BASE_URL);
  console.log("WebSocket URL:", `${BASE_URL}/api/ws`);

  useEffect(() => {
    // SockJS 엔드포인트 (서버 URL에 맞게 수정)
    const socket = new SockJS(`${BASE_URL}/api/ws`);
    const client = over(socket);

    const getAuthToken = () => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
    };

    const token = getAuthToken();

    client.connect(
      {
        Authorization: token, // 헤더에 토큰 포함 (서버 요구사항에 맞게 조정)
      },
      () => {
        // 구독 설정
        client.subscribe(`/api/sub/chat/rooms/${roomId}`, (msg) => {
          const parsedMessage = JSON.parse(msg.body);
          onMessageReceived(parsedMessage);
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      }
    );

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect(() => {});
      }
    };
  }, [roomId, onMessageReceived]);

  const sendMessage = (destination, payload) => {
    if (stompClient && stompClient.connected) {
      stompClient.send(destination, {}, JSON.stringify(payload));
    } else {
      console.log("WebSocket 연결이 되어 있지 않습니다.");
    }
  };

  return { stompClient, sendMessage };
};
