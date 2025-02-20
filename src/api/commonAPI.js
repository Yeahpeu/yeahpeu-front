import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useBudgetStore } from "../stores/budgetStore";

export const useBudgetQuery = () => {
  const { setTotalBudget, setUsedBudget } = useBudgetStore();
  return useQuery({
    queryKey: ["budget"],
    queryFn: () => axiosInstance.get("/api/v1/wedding/budget"),

    onError: (error) => {
      console.log(axiosInstance.request);
    },
  });
};
