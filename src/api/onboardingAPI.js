import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useSubmitOnboardingMutation = () => {
  return useMutation({
    mutationFn: async (selections) => {
      const response = await axiosInstance.post("", selections);
      return response.data;
    },
    onSuccess: () => {
      alert("성공공");
    },
    onError: (error) => {
      alert("실패");
      console.error(error);
    },
  });
};
