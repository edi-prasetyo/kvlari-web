// app/(payment)/payment/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePaymentDetail } from "@/features/payment/hooks/usePaymentDetail";
import { PaymentInstructions } from "@/features/payment/components/PaymentInstructions";
import { transactionService } from "@/features/transaction/services/transactionService";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("transaction_id");
  const transactionableType = searchParams.get("transactionable_type") || "point";

  const { data, loading, error } = usePaymentDetail(transactionId);
  const [fallbackData, setFallbackData] = useState<any>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [fallbackError, setFallbackError] = useState<string | null>(null);

  useEffect(() => {
    if (data) return;
    if (!transactionId) return;
    if (transactionableType !== "booking") return;

    const fetchBooking = async () => {
      setFallbackLoading(true);
      setFallbackError(null);
      try {
        const res = await transactionService.getBookingTransactionById(transactionId);
        const detail = res.data;
        if (detail) {
          const paymentData: any = {
            id: detail.id,
            transaction_id: detail.id,
            gateway: detail.payment_method,
            method: detail.payment_method,
            channel: "-",
            request_id: detail.uuid,
            payment_number: null,
            payment_code: null,
            qris_content: null,
            qris_url: null,
            payment_url: null,
            status: detail.payment_status || detail.status,
            expired_at: detail.updated_at,
            paid_at: detail.paid_at || null,
            created_at: detail.created_at,
            updated_at: detail.updated_at,
            transaction: {
              id: detail.id,
              transaction_code: detail.booking_code,
              uuid: detail.uuid,
              user_id: detail.user_id,
              product_id: 0,
              amount: detail.total_price,
              admin_fee: 0,
              discount_total: 0,
              price: detail.price,
              direction: "debit",
              status: detail.payment_status || detail.status,
              description: `Booking ${detail.origin} → ${detail.destination}`,
              transactionable: {
                type: "Booking",
                id: detail.id,
                booking_code: detail.booking_code,
                origin: detail.origin,
                destination: detail.destination,
                date: detail.date,
                time: detail.time,
                status: detail.status,
                payment_status: detail.payment_status,
                total_price: detail.total_price,
              },
            },
          };
          setFallbackData(paymentData);
        }
      } catch (err: any) {
        setFallbackError(
          err?.response?.data?.message || "Gagal memuat detail booking.",
        );
      } finally {
        setFallbackLoading(false);
      }
    };

    fetchBooking();
  }, [data, transactionId, transactionableType]);

  useEffect(() => {
    if (!data) return;

    const transactionable = data.transaction?.transactionable;
    const isBooking = transactionable && transactionable.type === "Booking";

    if (isBooking && (data.status === "paid" || data.status === "completed")) {
      router.push(`/booking/success?id=${transactionable.id}`);
    }
  }, [data, router]);

  const displayData = data || fallbackData;
  const displayError = error || fallbackError;
  const displayLoading = loading || fallbackLoading;

  if (displayLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (displayError || !displayData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
            ⚠️
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Gagal Memuat Detail Pembayaran
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {displayError || "Detail pembayaran tidak ditemukan."}
          </p>
          <button
            onClick={() => router.push("/history")}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm rounded-xl transition shadow-md shadow-blue-500/20"
          >
            Kembali ke Riwayat
          </button>
        </div>
      </div>
    );
  }

  return <PaymentInstructions data={displayData} />;
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            </div>
          }
        >
          <PaymentContent />
        </Suspense>
      </div>
    </div>
  );
}
