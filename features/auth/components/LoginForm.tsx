// features/auth/components/LoginForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  // State menampung Email atau No. HP
  const [identifier, setIdentifier] = useState("081234567004");
  const [password, setPassword] = useState("12345678");

  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Kirim value identifier ke field `email` sesuai kontrak API backend
    await login({
      email: identifier,
      password,
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email atau No. Telepon
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Contoh: user@mail.com atau 081234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Masukkan password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:bg-gray-400 transition"
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
};
