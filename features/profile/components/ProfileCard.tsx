// features/profile/components/ProfileCard.tsx
"use client";

import { useProfile } from "../hooks/useProfile";

export const ProfileCard = () => {
  const { profile, loading, error, logout } = useProfile();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500 font-medium">Memuat data profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md max-w-md mx-auto">
        {error}
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden text-gray-800">
      {/* Header Profile */}
      <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-blue-100 text-sm">{profile.email}</p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Info Poin & Status */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Poin Saldo
            </p>
            <p className="text-xl font-bold text-blue-600">
              {profile.point_user?.balance ?? 0} Pts
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Status Akun
            </p>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              {profile.is_verified ? "Terverifikasi" : "Belum Verifikasi"}
            </span>
          </div>
        </div>

        {/* Detail Informasi Akun */}
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b pb-2">
            Informasi Akun
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">No. Telepon</p>
              <p className="font-medium">{profile.phone || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Bio</p>
              <p className="font-medium">{profile.customer?.bio || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Alamat</p>
              <p className="font-medium">{profile.customer?.address || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Kode Pos</p>
              <p className="font-medium">
                {profile.customer?.postal_code || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
