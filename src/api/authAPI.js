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
  const { refetch: checkOnboarding } = useCheckOnboarding({ enabled: false });
  const { refetch: getCategory } = useGetCategory({ enabled: false });

  return useMutation({
    mutationFn: async (user) => {
      const params = new URLSearchParams();
      params.append("username", user.email);
      params.append("password", user.password);
      await loginInstance.post("/auth/login", params);
    },

    onSuccess: async () => {
      setLoggedIn(true);
      if (document.cookie.includes("authToken")) {
        const onboardingResult = await checkOnboarding();
        if (onboardingResult.data.onboarded === true) {
          navigate("/home", { replace: true });
        } else {
          const categoryResult = await getCategory();
          setCategory(categoryResult.data);
          navigate("/invitationCode", { replace: true });
        }
      }
    },

    onError: (error) => {
      alert(error, "로그인 실패");
    },
  });
};
