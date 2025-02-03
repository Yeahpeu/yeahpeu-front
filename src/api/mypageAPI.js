import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import useMypageStore from "../stores/mypageStore";

export const useMyPage = () => {
  const {
    setUsername,
    setNickname,
    setBudget,
    setWeddingDay,
    setPartnerName,
    setMyCode,
    setEmailAddress,
    setId,
  } = useMypageStore();

  return useQuery({
    queryKey: ["myPage"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/users/me");
      setId(response.data.id);
      setUsername(response.data.username);
      setNickname(response.data.nickname);
      setBudget(response.data.weddingInfoResponse.budget);
      setWeddingDay(response.data.weddingInfoResponse.weddingDay);
      setPartnerName(response.data.weddingInfoResponse.partnerName);

      setMyCode(response.data.myCode);
      setEmailAddress(response.data.emailAddress);

      return response.data;
    },
  });
};

export const useMyPageMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      await axiosInstance.put(`/api/v1/users/me`, data);
    },
  });
};
