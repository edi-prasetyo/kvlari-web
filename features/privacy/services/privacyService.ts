// features/privacy/services/privacyService.ts
import { publicApi } from "@/lib/api/publicApi";
import { PrivacyPolicyResponse } from "../types/privacyTypes";

export const getPrivacyPolicy = async (): Promise<PrivacyPolicyResponse> => {
  const response = await publicApi.get<PrivacyPolicyResponse>("/privacy-policy");
  return response.data;
};
