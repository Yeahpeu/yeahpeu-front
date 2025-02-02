import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useAuthStore } from "../stores/authStore";

export const useLoginMutation = () => {
  const { setLoggedIn, setEmail, setPassword } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user) => {
      await axiosInstance.post("/auth/login", user);
    },

    onSuccess: () => {
      setLoggedIn(true);
      navigate("/home");
    },
    onError: (error) => {
      alert(error, "로그인 실패");
    },
  });
};
