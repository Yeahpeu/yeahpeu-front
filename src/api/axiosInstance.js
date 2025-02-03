import axios from "axios";

//NOTE - import해서 axiosInstance.get 같은 형식으로 사용하면 됩니당
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", //NOTE - 서버의 기본 URL
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", //NOTE - request의 타입이 json임을 명시
  },
  withCredentials: true, //NOTE - 모든 페이지에서 쿠키를 허용
});

//NOTE - 요청 인터셉터 - Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  (config) => {
    //NOTE - 쿠키에서 authToken 추출
    const token =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0MEB0ZXN0LmNvbSIsImlhdCI6MTczODQ3MDYzOSwiZXhwIjoyMzQzMjcwNjM5fQ.5yADOWjoKQucuu1nzCVW7dPsMQk6pHQTASpXeGlKkRc";

    console.log("token", token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
