import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useSignupStore } from "../stores/authStore";
import { replace, useNavigate } from "react-router-dom";

export const useVerifyMutation = () => {
  const { setStatus } = useSignupStore();

  return useMutation({
    mutationFn: async (emailAddress) => {
      await axiosInstance.post(
        "/api/v1/auth/email-verification/request",
        emailAddress
      );
    },
    onSuccess: () => {
      setStatus(true);
    },
  });
};

export const useConfirmMutation = () => {
  const { setVerified } = useSignupStore();

  return useMutation({
    mutationFn: async (authCodeSet) => {
      await axiosInstance.post(
        "/api/v1/auth/email-verification/confirm",
        authCodeSet
      );
    },
    onSuccess: () => {
      setVerified(true);
    },
  });
};

export const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userInfo) => {
      await axiosInstance.post(
        axiosInstance.post("/api/v1/users/signup"),
        userInfo
      );
    },
    onSuccess: () => {
      console.log("회원가입 성공");
      navigate("/login", { replace: "true" });
    },
  });
};
