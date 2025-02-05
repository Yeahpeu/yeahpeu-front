// searchAPI.js
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// 위시 추가
export const useAddWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newWish) => {
      const response = await axiosInstance.post(
        "/api/v1/wedding/wishlist",
        newWish
      );
      return response.data;
    },
    onSuccess: () => {
      console.log("성공적으로 추가");
      queryClient.invalidateQueries(["newWish"]);
    },
    onError: (error) => {
      console.log(
        `위시리스트 추가 실패: ${
          error.response?.data?.message || "알 수 없는 오류"
        }`
      );
      console.error(error);
    },
  });
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
    mutationFn: async (wishItemId) => {
      const response = await axiosInstance.delete(
        `/api/v1/wedding/wishlist/${wishItemId}`
      );
      return response.data;
    },
    onError: (error) => {
      console.error("떠나기 실패:", error);
    },
  });
};
