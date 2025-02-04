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
      console.log("여기까진됨", response.data);
      if (response.data) {
        setTotalBudget(response.data.totalBudget);
        setUsedBudget(response.data.usedBudget);
      }
      return response.data;
    },
  });
};
