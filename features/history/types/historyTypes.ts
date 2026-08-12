// features/history/types/historyTypes.ts

export interface BookingHistoryItem {
  id: number;
  booking_code: string;
  user_id: number;
  contact_name: string;
  contact_phone: string;
  uuid: string;
  transport_route_id: number;
  schedule_id: number;
  total_seats: number;
  price: number;
  total_price: number;
  date: string;
  time: string;
  schedule_type: string;
  origin: string;
  destination: string;
  vehicle: string;
  plate_number: string | null;
  code: string;
  driver_name: string | null;
  contact_driver: string;
  payment_method: string;
  payment_status: "paid" | "unpaid" | "failed" | "pending" | string;
  paid_at: string | null;
  status: "scheduled" | "completed" | "cancelled" | string;
  is_read: number;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page?: number | null;
  active: boolean;
}

export interface PaginatedBookings {
  current_page: number;
  data: BookingHistoryItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface MyBookingsResponse {
  success: boolean;
  data: PaginatedBookings;
}
