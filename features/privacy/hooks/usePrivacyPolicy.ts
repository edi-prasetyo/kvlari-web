// features/privacy/hooks/usePrivacyPolicy.ts
"use client";

import { useState, useEffect } from "react";
import { getPrivacyPolicy } from "@/features/privacy/services/privacyService";
import { PrivacyPolicy } from "@/features/privacy/types/privacyTypes";

export const usePrivacyPolicy = () => {
  const [policy, setPolicy] = useState<PrivacyPolicy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getPrivacyPolicy();
        if (res.success && res.data) {
          setPolicy(res.data);
        } else {
          setError("Gagal memuat kebijakan privasi.");
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Terjadi kesalahan saat memuat kebijakan privasi.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  return { policy, loading, error };
};
