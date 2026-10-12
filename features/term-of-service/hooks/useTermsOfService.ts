// features/term-of-service/hooks/useTermsOfService.ts
"use client";

import { useState, useEffect } from "react";
import { getTermOfService } from "@/features/term-of-service/services/termOfServiceService";
import { TermOfService } from "@/features/term-of-service/types/termOfServiceTypes";

export const useTermsOfService = () => {
  const [term, setTerm] = useState<TermOfService | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerm = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getTermOfService();
        if (res.success && res.data) {
          setTerm(res.data);
        } else {
          setError("Gagal memuat syarat dan ketentuan.");
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Terjadi kesalahan saat memuat syarat dan ketentuan.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTerm();
  }, []);

  return { term, loading, error };
};
