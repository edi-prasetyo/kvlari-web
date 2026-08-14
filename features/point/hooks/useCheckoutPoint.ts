// features/point/hooks/useCheckoutPoint.ts
"use client";

import { useState } from "react";
import { pointService } from "@/features/point/services/pointService";
import {
  BuyPointPayload,
  BuyPointResponse,
} from "@/features/point/types/pointTypes";

export const useCheckoutPoint = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BuyPointResponse | null>(null);

  const buyPoint = async (payload: BuyPointPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await pointService.buyPointPackage(payload);
      if (res.success) {
        setResult(res);
        return res;
      } else {
        setError(res.message || "Gagal membuat transaksi pembelian poin.");
        return null;
      }
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        "Terjadi kesalahan saat memproses pembayaran.";
      setError(errMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    buyPoint,
    isLoading,
    error,
    result,
  };
};
