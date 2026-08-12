// features/history/services/historyService.ts

import { privateApi } from "@/lib/api/privateApi"; // Sesuaikan lokasi import privateApi Anda
import { MyBookingsResponse } from "@/features/history/types/historyTypes";

export const historyService = {
  getMyBookings: async (page = 1): Promise<MyBookingsResponse> => {
    const response = await privateApi.get<MyBookingsResponse>(
      `/booking/my-bookings?page=${page}`,
    );
    return response.data;
  },
};
