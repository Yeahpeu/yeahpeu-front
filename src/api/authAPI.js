import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import loginInstance from "./loginInstance";
import { useAuthStore } from "../stores/authStore";
import { useCheckOnboarding, useGetCategory } from "./onboardingAPI";
import useOnboardingStore from "../stores/onboardingStore";

export const useLoginMutation = () => {
  const { setLoggedIn } = useAuthStore();
  const { setCategory } = useOnboardingStore();
  const navigate = useNavigate();
  const { refetch: checkOnboarding } = useCheckOnboarding();
  const { refetch: getCategory } = useGetCategory();

  return useMutation({
    mutationFn: async (user) => {
      const params = new URLSearchParams();
      params.append("username", user.email);
      params.append("password", user.password);
      await loginInstance.post("/auth/login", params);
    },

    onSuccess: async () => {
      console.log("로그인 성공");
      setLoggedIn(true);
      if (document.cookie.includes("authToken")) {
        const onboardingResult = await checkOnboarding();
        if (onboardingResult.data === true) {
          navigate("/home", { replace: true });
        } else {
          const categoryResult = await getCategory();
          setCategory(categoryResult.data);
          console.log(categoryResult.data);
          navigate("/registrationStatus", { replace: true });
        }
      }
    },

    onError: (error) => {
      alert(error, "로그인 실패");
    },
  });
};
