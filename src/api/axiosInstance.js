import axios from "axios";
import { useNavigate } from "react-router-dom";
//NOTE - import해서 axiosInstance.get 같은 형식으로 사용하면 됩니당
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", //NOTE - 서버의 기본 URL
  headers: {
    "Content-Type": "application/json", //NOTE - request의 타입이 json임을 명시
  },
  withCredentials: true, //NOTE - 모든 페이지에서 쿠키를 허용
});

//NOTE - 요청 인터셉터 - Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  (config) => {
    //NOTE - 쿠키에서 authToken 추출
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//NOTE - 아래 코드는 수정이 필요해용 리프레시 토큰 어떻게 할지 결정하고 합시당

// 응답 인터셉터 - 만료된 토큰 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const navigate = useNavigate(); // React Router의 useNavigate 사용
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // JWT 만료 처리
      if (error.response.data?.error === "JWT expired") {
        try {
          // Refresh Token으로 새 Access Token 요청
          const { data } = await axios.post(
            "http://localhost:8080/auth/refresh",
            {},
            { withCredentials: true }
          );

          // 새 토큰 저장 및 기존 요청 재시도
          document.cookie = `authToken=${
            data.accessToken
          }; path=/; secure; samesite=Strict; expires=${new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toUTCString()}`;
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest); // 기존 요청 재전송
        } catch (refreshError) {
          console.error("Refresh Token 요청 실패:", refreshError);

          // Refresh Token도 만료된 경우
          document.cookie = "authToken=; Max-Age=0; path=/;"; // 쿠키 삭제
          navigate("/login"); // 로그인 페이지로 이동
        }
      } else {
        // 기타 401 에러 처리
        console.error("401 에러:", error);
        document.cookie = "authToken=; Max-Age=0; path=/;";
        navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
