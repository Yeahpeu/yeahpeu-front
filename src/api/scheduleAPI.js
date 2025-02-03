import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useScheduleStore } from "../stores/scheduleStore";

// 스케줄 범위 조회
export const useSchedules = () => {
  const today = new Date(); // 오늘
  const threeYearsLater = new Date();
  threeYearsLater.setFullYear(today.getFullYear() + 3); // 3년

  const formatDate = (date) => date.toISOString().split("T")[0];

  return useQuery({
    queryKey: ["schedules", formatDate(today), formatDate(threeYearsLater)],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/wedding/schedules", {
        params: {
          startDate: formatDate(today),
          endDate: formatDate(threeYearsLater),
        },
      });
      return response.data;
    },
  });
};

// 상세 조회
export const useScheduleDetail = (scheduleId) => {
  const setScheduleDetail = useScheduleStore(
    (state) => state.setScheduleDetail
  );

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["schedule", scheduleId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/wedding/schedules/${scheduleId}`
      );
      return response.data;
    },
    enabled: !!scheduleId,
    onSuccess: (data) => {
      if (data) {
        setScheduleDetail(scheduleId, data);
      }
    },
  });

  return { event, loading: isLoading, error };
};

// 스케줄 추가
export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSchedule) => {
      const response = await axiosInstance.post(
        "/api/v1/wedding/schedules",
        newSchedule
      );
      return response.data;
    },
    onSuccess: () => {
      console.log("성공적으로 추가");
      queryClient.invalidateQueries(["schedules"]);
    },
    onError: (error) => {
      console.log(
        `스케줄 추가 실패: ${error.response?.data?.message || "알 수 없는 오류"}`
      );
      console.error(error);
    },
  });
};

// 스케줄 수정
export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await axiosInstance.put(
        `/api/v1/wedding/schedules/${id}`,
        updatedData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("성공적으로 수정");
      queryClient.invalidateQueries(["schedule", data.id]);
      queryClient.invalidateQueries(["schedules"]);
    },
    onError: (error) => {
      console.log(
        `스케줄 수정 실패: ${error.response?.data?.message || "알 수 없는 오류"}`
      );
      console.error(error);
    },
  });
};

// 사용자 커스텀 카테고리 조회
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/wedding/categories");
      return response.data;
    },
  });
};
