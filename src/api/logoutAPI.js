import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout", {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
