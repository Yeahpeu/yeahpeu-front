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
      console.log("로그인 성공");
      setLoggedIn(true);
      if (document.cookie.includes("authToken")) {
        navigate("/home", { replace: true });
        console.log("네비게이트");
      }
    },
    onError: (error) => {
      alert(error, "로그인 실패");
    },
  });
};
