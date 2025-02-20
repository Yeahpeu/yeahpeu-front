// signupAPI.js
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useSignupStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useVerifyMutation = (setErrorMessage, setShowAlert) => {
  const { setStatus } = useSignupStore();

  return useMutation({
    mutationFn: async (emailAddress) => {
      const response = await axiosInstance.post(
        "/api/v1/auth/email-verification/request",
        emailAddress
      );
      if (response.status === 200) {
        setStatus(true);
      }
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message || "이메일 인증 요청을 다시 해주세요";
      setErrorMessage(msg);
      setShowAlert(true);
    },
  });
};

export const useConfirmMutation = (setErrorMessage, setShowAlert) => {
  const { setVerified, setAuthCode } = useSignupStore();

  return useMutation({
    mutationFn: async (authCodeSet) => {
      const response = await axiosInstance.post(
        "/api/v1/auth/email-verification/confirm",
        authCodeSet
      );
      if (response.status === 200) {
        setVerified(true);
      }
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "이메일 인증 확인 실패";
      setErrorMessage(msg);
      setShowAlert(true);

      if (msg.includes("인증번호") || msg.includes("일치하지")) {
        setAuthCode("");
      }
    },
  });
};

export const useSignupMutation = (setErrorMessage, setShowAlert) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userInfo) => {
      const response = await axiosInstance.post(
        "/api/v1/users/signup",
        userInfo
      );
      if (response.status === 200) {
        navigate("/login", { replace: true });
      }
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "회원가입 실패";
      setErrorMessage(msg);
      setShowAlert(true);
    },
  });
};
