import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useSearchQuery = (query) => {
  return useQuery(
    ["search", query],
    async () => {
      if (!query) return [];

      const response = await axiosInstance.get(
        `/v1/search/shop.json?query=${query}&display=10`
      );
      return response.data.items; // 네이버 API 응답에서 결과 데이터 반환
    },
    {
      enabled: !!query, // 검색어가 있을 때만 실행
    }
  );
};
