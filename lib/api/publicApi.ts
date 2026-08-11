// lib/api/publicApi.ts
import axios from "axios";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://kvlari.atrans.co.id/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
