// features/auth/hooks/useLogin.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { loginApi } from "@/features/auth/services/authApi";
import { LoginPayload } from "@/features/auth/types/authTypes";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginApi(payload);

      setCookie("access_token", data.access_token, {
        maxAge: data.expires_in,
        path: "/",
      });

      // Simpan refresh_token ke Cookie
      setCookie("refresh_token", data.refresh_token, {
        path: "/",
      });

      // PERBAIKAN:
      // 1. Utamakan data.user.is_verified daripada root data.is_verified
      // 2. Konversi angka (0/1) ke boolean
      const rawVerifiedState = data.user?.is_verified ?? data.is_verified;
      const isVerified = Number(rawVerifiedState) === 1;

      if (!isVerified) {
        const emailOrPhone =
          data.user?.email ||
          data.user?.phone ||
          (payload as any).email ||
          (payload as any).login ||
          "";

        const expiresAt = data.user?.otp_expires_at || "";

        router.push(
          `/verify?email=${encodeURIComponent(emailOrPhone)}&expires_at=${encodeURIComponent(expiresAt)}`,
        );
      } else {
        router.push("/profile");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Login gagal, periksa kembali email/nomor HP dan password Anda.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
