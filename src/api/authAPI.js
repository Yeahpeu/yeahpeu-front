import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useAuthStore } from "../stores/authStore";

export const useLoginMutation = () => {
  const { setLoggedIn, setEmail, setPassword } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user) => {
      const params = new URLSearchParams();
      params.append("username", user.email);
      params.append("password", user.password);
      await axiosInstance.post("/auth/login", params);
      console.log(params);
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
