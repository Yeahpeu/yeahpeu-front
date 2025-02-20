import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/api/v1/auth/logout", {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

export const useWithdraw = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete("/api/v1/users/me/withdraw", {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
