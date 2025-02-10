import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// 체크리스트 상세 조회
export const useTaskDetail = (eventId) => {
  return useQuery({
    queryKey: ["task", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/v1/wedding/events/${eventId}/tasks`
      );
      return data;
    },
    enabled: !!eventId,
  });
};

// 체크리스트 추가
export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, name }) => {
      const response = await axiosInstance.post(
        `/api/v1/wedding/events/${eventId}/tasks`,
        { name }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
    },
    onError: (error) => {
      console.error(
        `🚨 체크리스트 추가 실패: ${
          error.response?.data?.message || "알 수 없는 오류"
        }`
      );
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, taskId, completed }) => {
      const response = await axiosInstance.patch(
        `/api/v1/wedding/events/${eventId}/tasks/${taskId}`,
        { completed }
      );
      return response;
    },
    onSuccess: ({ data, eventId }) => {
      queryClient.invalidateQueries(["task", eventId]);
    },
    onError: (error) => {
      console.error(
        `체크리스트 수정 실패: ${
          error.response?.data?.message || "알 수 없는 오류"
        }`
      );
    },
  });
};

// 체크리스트 삭제
export const useDeleteTask = () => {
  return useMutation({
    mutationFn: async ({ eventId, taskId }) => {
      const response = await axiosInstance.delete(
        `/api/v1/wedding/events/${eventId}/tasks/${taskId}`
      );
      return response.data;
    },
    onError: (error) => {
      console.error("떠나기 실패:", error);
    },
  });
};
