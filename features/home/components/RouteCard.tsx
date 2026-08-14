// features/home/components/RouteCard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRouteStore } from "@/features/home/hooks/useRouteStore";
import { TransportRoute, RouteStop } from "@/features/home/types/transport";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

interface RouteCardProps {
  route: TransportRoute;
}

export const RouteCard = ({ route }: RouteCardProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const setBookingSelection = useRouteStore(
    (state) => state.setBookingSelection,
  );

  const sortedStops = [...route.route_stops].sort(
    (a, b) => a.stop_order - b.stop_order,
  );

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleSelectStop = (selectedDestinationStop: RouteStop) => {
    const originStop =
      sortedStops.length > 0 ? sortedStops[0] : selectedDestinationStop;
    setBookingSelection(route, originStop, selectedDestinationStop);
    router.push(`/schedule?id=${route.id}`);
  };

  return (
    <>
      {/* ── Main Route Card Item ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        <div>
          {/* Header Card */}
          <div className="p-5 border-b border-gray-100 bg-gradient-to-b from-gray-50/80 to-transparent">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {route.name}
              </h2>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
                  route.is_active === 1
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {route.is_active === 1 ? "Aktif" : "Non-aktif"}
              </span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">
              {route.description}
            </p>
          </div>

          {/* Info Jumlah Stop */}
          <div className="p-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50/60 text-blue-700 rounded-lg text-xs font-medium border border-blue-100/50">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{route.route_stops.length} Titik Pemberhentian</span>
            </div>
          </div>
        </div>

        {/* Card Footer & Action */}
        <div className="p-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
              Mulai Dari
            </span>
            <span className="text-xl font-extrabold text-blue-600">
              {formatRupiah(route.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpen}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20"
          >
            Pilih Rute
          </button>
        </div>
      </div>

      {/* ── Smooth Mobile Bottom Sheet Modal ── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden">
          {/* Backdrop Blur dengan Fading Opacity */}
          <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-out ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          {/* Bottom Sheet Container dengan Bezier Curve khas Mobile Native */}
          <div
            className={`relative w-full max-w-lg bg-white rounded-t-[32px] p-6 shadow-2xl z-10 max-h-[82vh] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              isAnimating ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Drag Handle Bar */}
            <div
              className="w-12 h-1.5 bg-gray-300 hover:bg-gray-400 rounded-full mx-auto mb-5 transition-colors cursor-pointer active:scale-95"
              onClick={handleClose}
            />

            {/* Header Sheet */}
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  Pilih Halte Tujuan
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  Rute:{" "}
                  <span className="text-blue-600 font-semibold">
                    {route.name}
                  </span>
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 text-gray-500 flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>

            {/* List Route Stops */}
            <div className="overflow-y-auto flex-1 pr-1 pb-4 space-y-3 custom-scrollbar">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Klik halte untuk memilih tujuan
              </p>

              <div className="relative pl-6 space-y-3">
                {/* Garis Vertikal Hubungan Antar Halte */}
                <div className="absolute left-[11px] top-4 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 rounded-full" />

                {sortedStops.map((stop, index) => {
                  const isFirst = index === 0;
                  const isLast = index === sortedStops.length - 1;

                  return (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={() => handleSelectStop(stop)}
                      className="relative w-full text-left flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50/40 active:scale-[0.98] transition-all duration-150 group shadow-2xs hover:shadow-md"
                    >
                      {/* Node Bullet Point */}
                      <div
                        className={`absolute -left-[20px] w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-all group-hover:scale-125 ${
                          isFirst
                            ? "border-blue-600 ring-4 ring-blue-100"
                            : isLast
                              ? "border-emerald-600 ring-4 ring-emerald-100"
                              : "border-gray-300 group-hover:border-blue-500"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isFirst
                              ? "bg-blue-600"
                              : isLast
                                ? "bg-emerald-600"
                                : "bg-gray-300 group-hover:bg-blue-500"
                          }`}
                        />
                      </div>

                      {/* Info Nama & Deskripsi Kota */}
                      <div className="flex-1 pr-3">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {stop.city.name}
                          </p>

                          {isFirst && (
                            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              Keberangkatan
                            </span>
                          )}
                          {isLast && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              Akhir Rute
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {stop.city.description}
                        </p>
                      </div>

                      {/* Icon Arrow */}
                      <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-blue-600 text-gray-400 group-hover:text-white flex items-center justify-center transition-all">
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
