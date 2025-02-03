import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useAuthStore } from "../stores/authStore";

export const useBudgetQuery = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["budget"],
    queryFn: () => axiosInstance.get("/api/v1/wedding/budget"),

    onError: (error) => {
      console.log(axiosInstance.request);
    },
  });
};
