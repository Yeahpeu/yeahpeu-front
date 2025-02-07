import axios from "axios";

const loginInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
