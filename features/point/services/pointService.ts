// features/point/services/pointService.ts

import { privateApi } from "@/lib/api/privateApi"; // Sesuaikan jalur import privateApi Anda
import { PointPackage, BuyPointPayload, BuyPointResponse } from "../types/pointTypes";

export const pointService = {
  // Get daftar paket poin
  getPointPackages: async (): Promise<PointPackage[]> => {
    const response = await privateApi.get<PointPackage[]>("/points");
    return response.data;
  },

  buyPointPackage: async (payload: BuyPointPayload): Promise<BuyPointResponse> => {
    const response = await privateApi.post<BuyPointResponse>("/points/buy", payload);
    return response.data;
  },
};