import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useChatStore } from "../stores/chatStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createThrottledFunction } from "../utils/throttleUtils";

// 참가한 채팅방 전체조회
export const useUserRooms = () => {
  const fetchRooms = createThrottledFunction(async () => {
    const response = await axiosInstance.get("/api/v1/user/chat/rooms");
    return response.data;
  });

  return useQuery({
    queryKey: ["userChatRooms"],
    queryFn: fetchRooms,
  });
};

//채팅방 참여
export const useJoinRoom = () => {
  const joinRoom = createThrottledFunction(async (roomId) => {
    const response = await axiosInstance.post(
      `/api/v1/chat/rooms/${roomId}/join`
    );
    return response.data;
  });

  return useMutation({
    mutationFn: joinRoom,
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
    refetchInterval: 5000,
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
  const { setRoomId, setRoomTitle, setImageUrl } = useChatStore();

  return useMutation({
    mutationFn: async (roomInfo) => {
      const response = await axiosInstance.post("/api/v1/chat/rooms", roomInfo);
      return response.data;
    },
    onSuccess: (data) => {
      setRoomTitle(data.title);
      setRoomId(data.id);
      setImageUrl(data.imageUrl);
      navigate(`/chat/mychat/rooms/${data.id}`, {
        state: { roomTitle: data.title },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// 채팅방 떠나기
export const useLeaveRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomId) => {
      const response = await axiosInstance.delete(
        `/api/v1/chat/rooms/${roomId}/leave`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChatRooms"] });
    },
    onError: (error) => {
      console.error("떠나기 실패:", error);
    },
  });
};

//NOTE - 파일 전송
export const useSendFile = () => {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await axiosInstance.post(
        "/api/v1/assets/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    },
  });
};

//NOTE - 참여자 정보 조회
export const useGetChatUsers = (roomId) => {
  const { setChatUsers } = useChatStore();
  return useQuery({
    queryKey: ["chatUsers", roomId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/chat/rooms/${roomId}/users`
      );
      setChatUsers(response.data);
      return response.data;
    },
  });
};
