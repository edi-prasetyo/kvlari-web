// features/auth/hooks/useLogin.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { loginApi } from "../services/authApi";
import { LoginPayload } from "../types/auth.types";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginApi(payload);

      // Simpan access_token ke Cookie (kadaluarsa disesuaikan dari expires_in / detik ke hari)
      setCookie("access_token", data.access_token, {
        maxAge: data.expires_in, // 60 detik (sesuai respon API)
        path: "/",
      });

      // Simpan refresh_token ke Cookie
      setCookie("refresh_token", data.refresh_token, {
        path: "/",
      });

      // Redirect ke halaman Profile setelah berhasil login
      router.push("/profile");
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
