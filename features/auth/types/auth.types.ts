// features/auth/types/auth.types.ts

export interface LoginPayload {
  email: string; // Bisa berisi Email (user@example.com) atau No. HP (081234567004)
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  is_verified: number;
}
