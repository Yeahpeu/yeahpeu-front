// searchAPI.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useSearchQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["search", keyword, page],
    queryFn: async () => {
      if (!keyword.trim()) {
        return [];
      }

      try {
        const response = await axiosInstance.get(
          `/api/v1/wedding/wishlist/shopping/naver`,
          {
            params: {
              keyword,
              page,
            },
          }
        );

        if (response && response.data && Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    },
    enabled: !!keyword,
  });
};
