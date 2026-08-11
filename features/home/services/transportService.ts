// home/services/transportService.ts
import { publicApi } from "@/lib/api/publicApi";
import { TransportRouteResponse } from "../types/transport";

export const getTransportRoutes = async (): Promise<TransportRouteResponse> => {
  const response =
    await publicApi.get<TransportRouteResponse>("/transport-routes");
  return response.data;
};
