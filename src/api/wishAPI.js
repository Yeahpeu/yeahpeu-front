// searchAPI.js
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useState } from "react";

export const useAddWish = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);

  const mutation = useMutation({
    mutationFn: async (newWish) => {
      const response = await axiosInstance.post(
        "/api/v1/wedding/wishlist",
        newWish
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      setErrorMessage(null);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "잠시 후 시도해 주세요.";
      setErrorMessage(message);
    },
  });

  return { ...mutation, errorMessage };
};

// 위시리스트 조회 -> main 에서 쓰는 건 3개만
export const useWishes = (size) => {
  return useQuery({
    queryKey: ["wishes", size],
    queryFn: async () => {
      const params = size ? { size } : {};
      const response = await axiosInstance.get("/api/v1/wedding/wishlist", {
        params,
      });
      return response.data;
    },
    enabled: true,
  });
};

// 위시리스트 삭제
export const useDeleteWish = () => {
  return useMutation({
    mutationFn: async (secureId) => {
      const response = await axiosInstance.delete(
        `/api/v1/wedding/wishlist/${secureId}`
      );
      return response.data;
    },
    onError: (error) => {
      console.error("떠나기 실패:", error);
    },
  });
};
