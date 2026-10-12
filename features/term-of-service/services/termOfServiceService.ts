// features/term-of-service/services/termOfServiceService.ts
import { publicApi } from "@/lib/api/publicApi";
import { TermOfServiceResponse } from "../types/termOfServiceTypes";

export const getTermOfService = async (): Promise<TermOfServiceResponse> => {
  const response = await publicApi.get<TermOfServiceResponse>(
    "/term-of-service",
  );
  return response.data;
};
