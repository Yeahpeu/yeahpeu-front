import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import loginInstance from "./loginInstance";
import { useAuthStore } from "../stores/authStore";

export const useLoginMutation = () => {
  const { setLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user) => {
      const params = new URLSearchParams();
      params.append("username", user.email);
      params.append("password", user.password);
      await loginInstance.post("/auth/login", params);
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
