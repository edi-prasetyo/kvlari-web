// app/term-of-service/page.tsx
import { TermsOfServiceView } from "@/features/term-of-service/components/TermsOfServiceView";

export const metadata = {
  title: "Syarat dan Ketentuan | Kvlari",
  description: "Syarat dan ketentuan layanan Kvlari",
};

export default function TermOfServicePage() {
  return <TermsOfServiceView />;
}
