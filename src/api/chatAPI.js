import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useChatStore } from "../stores/chatStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 참가한 채팅방 전체조회
export const useUserRooms = () => {
  return useQuery({
    queryKey: ["userChatRooms"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/user/chat/rooms");
      return response.data;
    },
  });
};

//채팅방 참여
export const useJoinRoom = () => {
  return useMutation({
    mutationFn: (roomId) =>
      axiosInstance
        .post(`/api/v1/chat/rooms/${roomId}/join`)
        .then((response) => response.data),
  });
};

// 전체 채팅방 조회
export const useRooms = () => {
  return useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/chat/rooms");
      return response.data;
    },
  });
};

// 나의 요약 정보 조회
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/users/me/summary");
      return response.data;
    },
  });
};

// 특정 채팅방의 텍스트 조회
export const useRoomMessages = (roomId) => {
  return useQuery({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/chat/rooms/${roomId}/messages`
      );

      return response.data;
    },
    enabled: !!roomId,
  });
};

// 채팅방 생성 추가
export const useCreateRoom = () => {
  const navigate = useNavigate();
  const { roomId, roomTitle, setRoomId, setRoomTitle } = useChatStore();

  return useMutation({
    mutationFn: async (roomInfo) => {
      const response = await axiosInstance.post("/api/v1/chat/rooms", roomInfo);
      return response.data;
    },
    onSuccess: (data) => {
      setRoomTitle(data.title);
      setRoomId(data.id);
      navigate(`/chat/mychat/rooms/${roomId}`, {
        state: { roomTitle },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// 채팅방 떠나기
export const useLeaveRoom = () => {
  return useMutation({
    mutationFn: async (roomId) => {
      console.log("떠나기 요청, roomId:", roomId);
      const response = await axiosInstance.delete(
        `/api/v1/chat/rooms/${roomId}/leave`
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("채팅방에서 나감:", data);
    },
    onError: (error) => {
      console.error("떠나기 실패:", error);
    },
  });
};
