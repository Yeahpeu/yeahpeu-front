import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useChatStore } from "../stores/chatStore";

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
