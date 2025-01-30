import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useGetOnboarding = () => {
  const response = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      await axiosInstance.get("/api/v1/onboarding");
    },
  });
  return response.data;
};

export const useSubmitOnboardingMutation = () => {
  return useMutation({
    mutationFn: async (selections) => {
      const response = await axiosInstance.post("", selections);
      return response.data;
    },
    onSuccess: () => {
      alert("성공");
    },
    onError: (error) => {
      alert("실패");
      console.error(error);
    },
  });
};
