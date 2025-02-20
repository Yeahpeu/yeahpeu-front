import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useScheduleStore } from "../stores/scheduleStore";

// 스케줄 범위 조회
export const useSchedules = () => {
  const today = new Date();
  const threeYearsLater = new Date();
  threeYearsLater.setFullYear(today.getFullYear() + 50);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  return useQuery({
    queryKey: ["schedules", formatDate(today), formatDate(threeYearsLater)],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/wedding/events", {
        params: {
          startDate: formatDate(today),
          endDate: formatDate(threeYearsLater),
        },
      });
      return response.data;
    },
  });
};

// 스케줄 월별 조회
export const useMonthSchedules = (startDate, endDate) => {
  return useQuery({
    queryKey: ["monthschedule", startDate, endDate],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/wedding/events", {
        params: {
          startDate,
          endDate,
        },
      });
      return response.data;
    },
    enabled: !!startDate && !!endDate,
  });
};

// 상세 조회
export const useScheduleDetail = (scheduleId) => {
  return useQuery({
    queryKey: ["schedule", scheduleId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/wedding/events/${scheduleId}`
      );
      return response.data;
    },
    enabled: !!scheduleId,
  });
};

// 스케줄 추가
export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSchedule) => {
      const response = await axiosInstance.post(
        "/api/v1/wedding/events",
        newSchedule
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"]);
    },
    onError: (error) => {
      console.log(
        `스케줄 추가 실패: ${
          error.response?.data?.message || "알 수 없는 오류"
        }`
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
        `/api/v1/wedding/events/${id}`,
        updatedData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["schedule", data.id]);
      queryClient.invalidateQueries(["schedules"]);
    },
    onError: (error) => {
      console.log(
        `스케줄 수정 실패: ${
          error.response?.data?.message || "알 수 없는 오류"
        }`
      );
      console.error(error);
    },
  });
};

// 스케줄 삭제
export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: async (scheduleId) => {
      const response = await axiosInstance.delete(
        `/api/v1/wedding/events/${scheduleId}`
      );
      return response.data;
    },
    onError: (error) => {
      console.error("떠나기 실패:", error);
    },
  });
};

// 스케줄 완료 처리
export const completeEvents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, completed }) => {
      const response = await axiosInstance.patch(
        `/api/v1/wedding/events/${eventId}/status`,
        { completed }
      );
      return response.data;
    },
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries(["schedules"]);
      queryClient.invalidateQueries(["schedule", eventId]);
    },
    onError: (error) => {
      console.log(
        `스케줄 완료 실패: ${
          error.response?.data?.message || "알 수 없는 오류"
        }`
      );
      console.error(error);
    },
  });
};

// 사용자 커스텀 카테고리 조회
export const useCategories = () => {
  const setCategories = useScheduleStore((state) => state.setCategories);

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/wedding/categories");
      setCategories(response.data);
      return response.data;
    },
    onError: (error) => {
      console.error("카테고리 불러오기 실패:", error);
    },
  });
};

// 소주제별 이벤트 조회
export const useSubcategories = (categoryId) => {
  return useQuery({
    queryKey: ["subevents", categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/wedding/events/subcategories/${categoryId}`
      );
      return response.data;
    },
  });
};
