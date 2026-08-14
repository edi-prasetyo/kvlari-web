// features/transaction/hooks/useTransactionDetail.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { transactionService } from "@/features/transaction/services/transactionService";
import { TransactionDetail } from "@/features/transaction/types/transactionTypes";

export const useTransactionDetail = (id: string | number | null) => {
  const [transaction, setTransaction] = useState<TransactionDetail | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      setError("ID Transaksi tidak ditemukan.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const res = await transactionService.getPointTransactionById(id);
      if (res.success) {
        setTransaction(res.data);
      } else {
        setError(res.message || "Gagal mengambil data transaksi.");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Terjadi kesalahan saat memuat detail transaksi.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    transaction,
    isLoading,
    error,
    refetch: fetchDetail,
  };
};
