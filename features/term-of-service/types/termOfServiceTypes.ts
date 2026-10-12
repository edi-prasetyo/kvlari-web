// features/term-of-service/types/termOfServiceTypes.ts

export interface TermOfService {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface TermOfServiceResponse {
  success: boolean;
  data: TermOfService;
}
