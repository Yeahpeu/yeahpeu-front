import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import useMypageStore from "../stores/mypageStore";
import { useNavigate } from "react-router-dom";

export const useMyPage = () => {
  const {
    setAvatarUrl,
    setUsername,
    setNickname,
    setBudget,
    setWeddingDay,
    setPartnerName,
    setMyCode,
    setEmailAddress,
    setId,
    setWeddingRole,
  } = useMypageStore();

  return useQuery({
    queryKey: ["myPage"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/users/me");
      if (response.data) {
        setAvatarUrl(response.data.avatarUrl);
        setId(response.data.id);
        setUsername(response.data.username);
        setNickname(response.data.nickname);
        setBudget(response.data.weddingInfoResponse.budget);
        setWeddingDay(response.data.weddingInfoResponse.weddingDay);
        setPartnerName(response.data.weddingInfoResponse.partnerName);
        setMyCode(response.data.myCode);
        setEmailAddress(response.data.emailAddress);
        setWeddingRole(response.data.weddingRole);
      }
      return response.data;
    },
  });
};

export const useMyPageMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      await axiosInstance.put(`/api/v1/users/me`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPage"]);
      navigate("/mypage");
    },
  });
};

export const useAvatarUpload = () => {
  const { setAvatarUrl } = useMypageStore();
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await axiosInstance.post(
        "/api/v1/assets/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAvatarUrl(response.data.url);
      return response.data;
    },
  });
};
