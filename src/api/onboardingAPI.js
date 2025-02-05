import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";

export const useSubmitOnboardingMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await axiosInstance.post("/api/v1/onboarding", data);
      return response.data;
    },
    onSuccess: () => {
      console.log("성공");
      navigate("/home", { replace: true });
    },
    onError: (error) => {
      alert("실패");
      console.error(error);
    },
  });
};

export const useGetCategory = (options = {}) => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/categories");
      return response.data;
    },
    enabled: false,
    ...options,
    onSuccess: (data) => {
      console.log(data);
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
    enabled: false,
    ...options,
  });
};

export const usePostInvitationCode = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await axiosInstance.post("/api/v1/wedding/join", data);

      return response.data;
    },
    onSuccess: () => {
      navigate("/home", { replace: true });
    },
    onError: (error) => {
      alert("실패");
      console.error(error);
    },
  });
};
