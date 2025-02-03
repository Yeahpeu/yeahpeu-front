import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useChatStore } from "../stores/chatStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useChatSendMutation = () => {
  const { setChat, setRoomId, roomId } = useChatStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (chat) => {
      await axiosInstance.post("/api/v1/chat/rooms/" + roomId, chat);
    },

    onSuccess: () => {
      //navigate("/home", { replace: "true" });
    },
    onError: (error) => {
      //alert(error, "로그인 실패");
    },
  });
};

// 참가한 채팅방 전체조회
export const useUserRooms = () => {
  return useQuery({
    queryKey: ["chatRoom"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/user/chat/rooms");
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
