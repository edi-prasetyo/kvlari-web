// types/transport.ts

export interface City {
  id: number;
  name: string;
  description: string;
  image: string | null;
  is_active: number;
}

export interface RouteStop {
  id: number;
  transport_route_id: number;
  city_id: number;
  stop_order: number;
  city: City;
}

export interface TransportRoute {
  id: number;
  name: string;
  product_id: number;
  description: string;
  price: number;
  is_active: number;
  latitude: string;
  longitude: string;
  route_stops: RouteStop[];
}

export interface TransportRouteResponse {
  success: boolean;
  server_time: string;
  active_type: string;
  data: TransportRoute[];
}
