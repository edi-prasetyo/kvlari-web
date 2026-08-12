"use client";

interface CheckoutSummaryProps {
  origin: string;
  destination: string;
  date: string;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  pointBalance?: number;
}

export const CheckoutSummary = ({
  origin,
  destination,
  date,
  paymentMethod,
  setPaymentMethod,
  pointBalance = 0,
}: CheckoutSummaryProps) => {
  return (
    <div className="space-y-6">
      {/* Ringkasan Perjalanan */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Detail Perjalanan
        </h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Rute</p>
            <p className="font-extrabold text-slate-900 text-base">
              {origin} → {destination}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Tanggal Keberangkatan</p>
            <p className="font-bold text-slate-800 text-sm">{date}</p>
          </div>
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 block">
          Metode Pembayaran
        </label>
        <div
          onClick={() => setPaymentMethod("point_balance")}
          className={`cursor-pointer border rounded-2xl p-4 flex items-center justify-between transition-all ${
            paymentMethod === "point_balance"
              ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              P
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Point Balance</p>
              <p className="text-xs text-slate-500">
                Saldo Poin: {pointBalance.toLocaleString("id-ID")} Poin
              </p>
            </div>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === "point_balance"
                ? "border-blue-600 bg-blue-600"
                : "border-slate-300"
            }`}
          >
            {paymentMethod === "point_balance" && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
