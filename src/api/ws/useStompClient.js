// src/hooks/useStompClient.js
import { useState, useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

export const useStompClient = (roomId, onMessageReceived) => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClient = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 인증 토큰 가져오기 함수
  const getAuthToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
  };

  const connect = useCallback(async () => {
    if (!roomId) return;

    try {
      const socket = new SockJS(`${BASE_URL}/api/ws`);
      stompClient.current = over(socket);

      // 디버그 로그 비활성화
      stompClient.current.debug = null;

      await new Promise((resolve, reject) => {
        const token = getAuthToken();

        stompClient.current.connect(
          {
            // 헤더에 인증 토큰 추가
            Authorization: token,
          },
          () => {
            setIsConnected(true);
            reconnectAttempts.current = 0;

            // 구독 설정
            stompClient.current.subscribe(
              `/api/sub/chat/rooms/${roomId}`,
              (message) => {
                const receivedMessage = JSON.parse(message.body);
                onMessageReceived(receivedMessage);
              },
              // 구독 헤더에도 토큰 추가
              { Authorization: token }
            );
            resolve();
          },
          (error) => {
            console.error("STOMP 연결 에러:", error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error("웹소켓 연결 실패:", error);

      // 재연결 로직
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        const delay = 2000 * Math.pow(2, reconnectAttempts.current - 1); // 진정한 지수 백오프
        console.log(
          `${delay}ms 후 재연결 시도 ${reconnectAttempts.current}/${maxReconnectAttempts}`
        );
        setTimeout(() => {
          connect();
        }, delay);
      } else {
        console.error("최대 재연결 시도 횟수 초과");
      }
    }
  }, [roomId, onMessageReceived]);

  // 연결 해제 함수
  const disconnect = useCallback(() => {
    if (stompClient.current && stompClient.current.connected) {
      try {
        stompClient.current.disconnect();
      } catch (error) {
        console.error("연결 해제 중 에러:", error);
      } finally {
        setIsConnected(false);
      }
    }
  }, []);

  // 컴포넌트 마운트 시 연결
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const sendMessage = (destination, payload) => {
    if (stompClient.current && stompClient.current.connected) {
      console.log("메시지 전송시도");
      try {
        stompClient.current.send(destination, {}, JSON.stringify(payload));
        console.log("메시지 전송 성공");
      } catch (error) {
        console.error("메시지 전송 실패:", error);
        // 연결이 끊어졌다면 재연결 시도
        if (!stompClient.current.connected) {
          connect();
        }
      }
    } else {
      console.log("WebSocket 연결이 되어 있지 않습니다. 재연결을 시도합니다.");
      connect();
    }
  };

  return {
    isConnected,
    sendMessage,
    connect,
    disconnect,
  };
};
