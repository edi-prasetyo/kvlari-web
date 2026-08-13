// app/(transaction)/transaction/payment/page.tsx
"use client";

import { Suspense } from "react";
import { PaymentDetailView } from "@/features/transaction/components/PaymentDetailView";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 md:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Instruksi Pembayaran
          </h1>
          <p className="text-sm text-slate-500">
            Selesaikan pembayaran Anda sesuai dengan instruksi dan nomor Virtual
            Account di bawah ini.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="p-8 bg-white rounded-3xl border border-slate-100 text-center text-xs text-slate-400">
              Memuat instruksi pembayaran...
            </div>
          }
        >
          <PaymentDetailView />
        </Suspense>
      </div>
    </div>
  );
}
