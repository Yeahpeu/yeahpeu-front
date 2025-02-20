import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useScheduleStore } from "../stores/scheduleStore";
import { useAiStore } from "../stores/aiStore";

export const useHomeAi = () => {
  return useQuery({
    queryKey: ["homeAi"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/ai/incoming");
      return response.data;
    },
    retry: false,
  });
};

// 판사 답변
export const useCreateAiJidgeMutation = () => {
  const { setChatMessages } = useAiStore();
  //const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userResponses) => {
      const response = await axiosInstance.post(
        "/api/v1/ai/judge",
        userResponses
      );
      setChatMessages(response.data.judge);
      return response;
    },
    onSuccess: (response) => {
      console.log("성공", response.data.judge);
    },
    onError: (error) => {
      console.log(
        `판사 답변 실패: ${error.response?.data?.message || "알 수 없는 오류"}`
      );
      console.error(error);
    },
  });
};
