// features/auth/services/authApi.ts
import { publicApi } from "@/lib/api/publicApi";
import { LoginPayload, LoginResponse } from "../types/auth.types";

export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await publicApi.post<LoginResponse>("/login", payload);
  return response.data;
};
