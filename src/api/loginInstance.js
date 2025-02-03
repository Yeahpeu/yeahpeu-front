import axios from "axios";

const loginInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

loginInstance.interceptors.response.use(
  (response) => {
    const newToken =
      response.headers.authorization || response.headers.Authorization;

    if (newToken) {
      document.cookie = `authToken=${newToken}; path=/`;
    }
    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default loginInstance;
