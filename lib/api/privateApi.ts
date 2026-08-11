// lib/api/privateApi.ts
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://kvlari.atrans.co.id/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor: Menyisipkan Access Token
privateApi.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Redirect jika 401 (Token Expired / Invalid)
privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
