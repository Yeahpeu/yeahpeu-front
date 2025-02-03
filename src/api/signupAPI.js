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
      if (response.status === 200) {
        setStatus(true);
        console.log("이메일 인증 요청 성공");
      } else {
        console.log("이메일 인증 요청 실패");
      }
    },
  });
};

export const useConfirmMutation = () => {
  const { setVerified } = useSignupStore();

  return useMutation({
    mutationFn: async (authCodeSet) => {
      const response = await axiosInstance.post(
        "/api/v1/auth/email-verification/confirm",
        authCodeSet
      );
      if (response.status === 200) {
        setVerified(true);
        console.log("이메일 인증 확인 성공");
      } else {
        console.log("이메일 인증 확인 실패");
      }
    },
  });
};

export const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userInfo) => {
      console.log("userInfo", userInfo.username);
      const signupInfo = {
        emailAddress: userInfo.emailAddress,
        name: userInfo.username,
        password: userInfo.password,
      };
      const response = await axiosInstance.post(
        "/api/v1/users/signup",
        signupInfo
      );
      if (response.status === 200) {
        navigate("/login", { replace: "true" });
        console.log("회원가입 성공");
      } else {
        console.log("회원가입 실패");
      }
    },
  });
};
