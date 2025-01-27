import { useMutation } from "react-query";
import axiosInstance from "./axiosInstance";

//REVIEW - API는 개별로 export 하는 거 어때용? 하나씩 빼서 쓰는게 좋을 것 같아서서
export const useLoginMutation = () => {
  return useMutation(async ({ email, password }) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const authorizationHeader = response.headers["authorization"];
    if (!authorizationHeader) {
      throw new Error("토큰이 없어용 T^T");
    }

    const token = authorizationHeader.split(" ")[1]; //NOTE - Bearer 제거

    //NOTE - 토큰을 쿠키에 저장
    document.cookie = `authToken=${token}; path=/; secure; samesite=Strict; expires=${new Date(
      Date.now() + 1 * 24 * 60 * 60 * 1000 //NOTE - 만료 1일일
    ).toUTCString()}`;

    return token;
  });
};
