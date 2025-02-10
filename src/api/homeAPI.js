import axiosInstance from "./axiosInstance";
import { useBudgetStore } from "../stores/homeStore";
import { useQuery } from "@tanstack/react-query";

export const useBudgetAPI = () => {
  const { setTotalBudget, setUsedBudget } = useBudgetStore();

  return useQuery({
    queryKey: ["budgetsummary"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/api/v1/wedding/budget/summary"
      );
      if (response.data) {
        setTotalBudget(response.data.totalBudget);
        setUsedBudget(response.data.usedBudget);
      }
      return response.data;
    },
  });
};

export const useProgressBar = () => {
  return useQuery({
    queryKey: ["progressBar"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/wedding/events/bar");
      return response.data;
    },
  });
};

export const completeSchedule = async (scheduleId) => {
  const response = await axiosInstance.patch(
    `/api/v1/wedding/events/${scheduleId}/complete`
  );
  return response.data;
};
