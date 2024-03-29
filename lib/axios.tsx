import axios from "axios";

export const instance = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

const getAuth = () => JSON.parse(localStorage.getItem("privy:token") || "{}");

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuth();

    if (config.headers) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
