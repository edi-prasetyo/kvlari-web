// features/history/components/HistoryList.tsx
"use client";

import { useMyBookings } from "../hooks/useMyBookings";
import { HistoryCard } from "./HistoryCard";

export const HistoryList = () => {
  const { bookings, pagination, isLoading, error, page, setPage } =
    useMyBookings(1);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse space-y-4"
          >
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-8 bg-slate-100 rounded w-1/2" />
            <div className="h-4 bg-slate-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-rose-50/50 rounded-2xl border border-rose-100 p-6">
        <p className="text-sm font-semibold text-rose-600">{error}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 text-2xl">
          🎫
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          Belum Ada Perjalanan
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Anda belum pernah melakukan pemesanan tiket. Silakan pesan tiket
          perjalanan Anda terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {bookings.map((booking) => (
          <HistoryCard key={booking.id} booking={booking} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            &laquo; Sebelumnya
          </button>
          <span className="text-xs font-semibold text-slate-500">
            Halaman {pagination.current_page} dari {pagination.last_page}
          </span>
          <button
            disabled={page >= pagination.last_page}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            Selanjutnya &raquo;
          </button>
        </div>
      )}
    </div>
  );
};
