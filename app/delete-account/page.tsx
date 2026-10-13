// app/delete-account/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hapus Akun | Kvlari",
  description:
    "Panduan penghapusan akun Kvlari. Akun dapat dihapus secara mandiri melalui aplikasi di menu Profile -> Hapus Akun.",
};

const steps = [
  {
    title: "Buka Aplikasi Kvlari",
    description:
      "Pastikan Anda menggunakan versi aplikasi terbaru dan sudah masuk ke akun yang ingin dihapus.",
  },
  {
    title: "Masuk ke Menu Profile",
    description:
      "Ketuk menu Profile pada bagian bawah atau samping halaman utama aplikasi.",
  },
  {
    title: "Pilih Tab Hapus Akun",
    description:
      'Pada halaman Profile, pilih menu "Hapus Akun" pada bagian Pengaturan Akun.',
  },
  {
    title: "Konfirmasi Penghapusan",
    description:
      "Baca kembali peringatan yang ditampilkan, lalu konfirmasi penghapusan akun Anda.",
  },
];

const deletedData = [
  "Nama, email, dan nomor telepon yang terdaftar",
  "Riwayat pemesanan tiket shuttle dan perjalanan",
  "Saldo poin serta riwayat transaksi poin",
  "Foto profil dan data pelanggan lainnya",
];

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Hapus Akun</h1>
          <p className="text-sm text-slate-600">
            Terakhir diperbarui: 05 October 2026
          </p>

          <p className="text-sm leading-relaxed text-slate-600">
            Kvlari memberi Anda kendali penuh atas data pribadi Anda. Akun dapat
            dihapus secara mandiri langsung melalui aplikasi Kvlari tanpa perlu
            menghubungi layanan konsumen terlebih dahulu.
          </p>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">
              Cara menghapus akun
            </p>
            <p className="mt-1 text-sm leading-relaxed text-blue-800">
              Buka aplikasi Kvlari, masuk ke menu{" "}
              <span className="font-semibold">Profile</span>, kemudian pilih tab{" "}
              <span className="font-semibold">Hapus Akun</span> dan ikuti
              proses konfirmasi hingga selesai.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Langkah Penghapusan Akun di Aplikasi
          </h2>
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {step.title}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Data yang Akan Dihapus
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Setelah penghapusan akun dikonfirmasi, data berikut akan dihapus
            secara permanen dari sistem kami:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            {deletedData.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-slate-600">
                {item}
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-semibold text-rose-900">Perhatian</p>
            <p className="mt-1 text-sm leading-relaxed text-rose-700">
              Penghapusan akun bersifat permanen dan tidak dapat dibatalkan.
              Setelah akun dihapus, saldo poin dan riwayat transaksi Anda tidak
              dapat dipulihkan kembali. Pastikan Anda telah menggunakan seluruh
              saldo poin sebelum menghapus akun.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Butuh Bantuan?</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Jika Anda mengalami kendala saat menghapus akun melalui aplikasi,
            silakan hubungi layanan konsumen kami melalui menu Pusat Bantuan di
            aplikasi Kvlari.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Untuk informasi lebih lanjut mengenai pengelolaan data Anda, silakan
            baca{" "}
            <Link
              href="/privacy"
              className="font-semibold text-blue-600 hover:underline"
            >
              Kebijakan Privasi
            </Link>{" "}
            dan{" "}
            <Link
              href="/term-of-service"
              className="font-semibold text-blue-600 hover:underline"
            >
              Syarat dan Ketentuan
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
