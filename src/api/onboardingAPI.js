import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useMypageStore from "../stores/mypageStore";

export const useSubmitOnboardingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/api/v1/onboarding", data);
      return response.data;
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries(["onboardingcheck"]);
    },
    onError: (error) => {
      console.error("온보딩 제출 실패:", error);
    },
  });
};

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/categories");
      return response.data;
    },
  });
};

export const useCheckOnboarding = (options = {}) => {
  return useQuery({
    queryKey: ["onboardingcheck"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/onboarding/status");
      return response.data;
    },
    ...options,
  });
};

export const usePostInvitationCode = () => {
  const { setPartnerName } = useMypageStore();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/api/v1/wedding/join", data);
      return response.data;
    },
    onSuccess: (data) => {
      setPartnerName(data.partnerName);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useFindPartner = () => {
  return useMutation({
    mutationFn: async ({ partnerCode }) => {
      const response = await axiosInstance.get(`/api/v1/users/${partnerCode}`);
      return response.data;
    },
  });
};
