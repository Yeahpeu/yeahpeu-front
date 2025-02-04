import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// 체크리스트 상세 조회
export const useTaskDetail = (eventId) => {
  return useQuery({
    queryKey: ["task", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/v1/wedding/events/${eventId}`
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
    mutationFn: async ({ eventId, tasks }) => {
      const { data } = await axiosInstance.post(
        `/api/v1/wedding/events/${eventId}`,
        {
          checklists: tasks,
        }
      );
      return data;
    },
    onSuccess: () => {
      console.log("체크리스트가 성공적으로 추가되었습니다.");
      queryClient.invalidateQueries(["task"]); // 데이터 무효화
    },
    onError: (error) => {
      console.error(
        `체크리스트 추가 실패: ${error.response?.data?.message || "알 수 없는 오류"}`
      );
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ eventId, updatedTasks }) => {
      const { data } = await axiosInstance.put(
        `/api/v1/wedding/events/${eventId}`,
        {
          checklists: updatedTasks,
        }
      );
      return { data, eventId };
    },
    {
      onSuccess: ({ data, eventId }) => {
        console.log("체크리스트가 성공적으로 수정되었습니다.");
        queryClient.invalidateQueries(["task", eventId]);
      },
      onError: (error) => {
        console.error(
          `체크리스트 수정 실패: ${error.response?.data?.message || "알 수 없는 오류"}`
        );
      },
    }
  );
};
