// app/privacy/page.tsx
import { PrivacyPolicyView } from "@/features/privacy/components/PrivacyPolicyView";

export const metadata = {
  title: "Kebijakan Privasi | Kvlari",
  description: "Kebijakan privasi layanan Kvlari",
};

export default function PrivacyPage() {
  return <PrivacyPolicyView />;
}
