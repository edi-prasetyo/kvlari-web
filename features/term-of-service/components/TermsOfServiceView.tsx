// features/term-of-service/components/TermsOfServiceView.tsx
"use client";

import { useTermsOfService } from "@/features/term-of-service/hooks/useTermsOfService";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";

export const TermsOfServiceView = () => {
  const { term, loading, error } = useTermsOfService();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500 font-medium">
              Memuat syarat dan ketentuan...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Gagal Memuat Syarat dan Ketentuan
          </h2>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!term) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div
          className="space-y-4 text-sm leading-relaxed text-slate-600 [&_h1]:text-base [&_h1]:font-bold [&_h1]:text-slate-900 [&_h2]:mt-6 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mt-6 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-slate-900 [&_em]:italic [&_a]:font-medium [&_a]:text-blue-600 [&_a:hover]:underline [&_hr]:my-6 [&_hr]:border-slate-200"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(term.description),
          }}
        />
      </div>
    </div>
  );
};
