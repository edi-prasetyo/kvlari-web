// features/transaction/components/TransactionListView.tsx
"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useTransactionList } from "../hooks/useTransactionList";
import { TransactionItem } from "../types/transactionTypes";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "paid":
      return (
        <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
          Selesai
        </span>
      );
    case "pending":
      return (
        <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-amber-50 text-amber-600 border border-amber-200/60">
          Menunggu
        </span>
      );
    case "failed":
    case "cancelled":
      return (
        <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-rose-50 text-rose-600 border border-rose-200/60">
          Gagal
        </span>
      );
    default:
      return (
        <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          {status}
        </span>
      );
  }
};

export const TransactionListView = () => {
  const router = useRouter();
  const { transactions, pagination, page, setPage, isLoading, error, refetch } =
    useTransactionList();

  const handleDetailClick = (item: TransactionItem) => {
    // Navigasi menggunakan UUID sesuai permintaan sebelumnya
    router.push(`/transaction/payment?id=${item.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">
            Riwayat Transaksi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar transaksi pembelian poin akun Anda.
          </p>
        </div>
        <button
          onClick={refetch}
          disabled={isLoading}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          title="Muat Ulang"
        >
          <Icon icon="mdi:reload" width={20} height={20} />
        </button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-100 animate-pulse space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 bg-slate-100 rounded w-1/4" />
                <div className="h-5 bg-slate-100 rounded-full w-16" />
              </div>
              <div className="h-6 bg-slate-100 rounded w-1/2" />
              <div className="h-3 bg-slate-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="bg-white rounded-2xl border border-rose-100 p-8 text-center space-y-3">
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 text-xl">
            ⚠️
          </div>
          <p className="text-xs font-semibold text-slate-700">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && transactions.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 text-xl">
            📋
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Belum Ada Transaksi
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Anda belum melakukan transaksi pembelian poin saat ini.
          </p>
        </div>
      )}

      {/* List Transaksi */}
      {!isLoading && !error && transactions.length > 0 && (
        <div className="space-y-3">
          {transactions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleDetailClick(item)}
              className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-slate-200 transition-all cursor-pointer shadow-sm hover:shadow group space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  {item.transaction_code}
                </span>
                {getStatusBadge(item.status)}
              </div>

              <div className="flex items-end justify-between pt-1">
                <div>
                  <p className="text-xs font-medium text-slate-500 line-clamp-1">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {formatDate(item.created_at)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-base font-black text-slate-900">
                    {formatRupiah(item.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controller */}
      {!isLoading && !error && pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!pagination.prev_page_url}
            className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Sebelumnya
          </button>

          <span className="font-medium text-slate-500">
            Halaman{" "}
            <strong className="text-slate-900">
              {pagination.current_page}
            </strong>{" "}
            dari{" "}
            <strong className="text-slate-900">{pagination.last_page}</strong>
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={!pagination.next_page_url}
            className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Selanjutnya →
          </button>
        </div>
      )}
    </div>
  );
};
