// features/privacy/types/privacyTypes.ts

export interface PrivacyPolicy {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PrivacyPolicyResponse {
  success: boolean;
  data: PrivacyPolicy;
}
