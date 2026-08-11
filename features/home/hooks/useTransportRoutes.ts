// home/hooks/useTransportRoutes.ts
import { useEffect, useState } from "react";
import { getTransportRoutes } from "../services/transportService";
import { TransportRoute } from "../types/transport";

export const useTransportRoutes = () => {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [serverTime, setServerTime] = useState<string>("");
  const [activeType, setActiveType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getTransportRoutes();
        if (res.success) {
          setRoutes(res.data);
          setServerTime(res.server_time);
          setActiveType(res.active_type);
        }
      } catch (err) {
        setError("Gagal memuat data rute transportasi");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { routes, serverTime, activeType, loading, error };
};
