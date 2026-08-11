// app/(schedule)/schedule/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useSchedule } from "@/features/schedule/hooks/useSchedule";
import { ScheduleCard } from "@/features/schedule/components/ScheduleCard";

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const routeId = searchParams.get("id");

  const { routeDetail, serverTime, activeType, currentDate, loading, error } =
    useSchedule(routeId);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !routeDetail) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Kembali ke Rute
        </button>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error || "Data tidak ditemukan"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-1 transition"
      >
        ← Kembali
      </button>

      {/* Header Info Rute */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {routeDetail.name}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {routeDetail.description}
            </p>
          </div>

          {currentDate && (
            <div className="bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-900 self-start sm:self-auto">
              Tanggal: {currentDate}
            </div>
          )}
        </div>

        {/* Server Time & Sesi Info */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>
            Waktu Server:{" "}
            <strong className="text-gray-700">{serverTime}</strong>
          </span>
          <span>•</span>
          <span>
            Sesi:{" "}
            <strong className="capitalize text-blue-600">{activeType}</strong>
          </span>
        </div>
      </div>

      {/* Daftar Jadwal */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          Pilih Jam Keberangkatan ({routeDetail.schedules.length} Jadwal)
        </h2>

        {routeDetail.schedules.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">
              Tidak ada jadwal tersedia untuk rute ini.
            </p>
          </div>
        ) : (
          routeDetail.schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              price={routeDetail.price}
              onSelectSchedule={(selected) => {
                // Navigasi ke halaman pemesanan/pilih kursi selanjutnya
                console.log("Jadwal dipilih:", selected);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
