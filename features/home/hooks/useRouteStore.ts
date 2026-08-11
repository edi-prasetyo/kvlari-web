import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TransportRoute, RouteStop } from "../types/transport";

interface RouteState {
    selectedRoute: TransportRoute | null;
    origin: RouteStop | null;
    destination: RouteStop | null;
    setBookingSelection: (
        route: TransportRoute,
        origin: RouteStop,
        destination: RouteStop
    ) => void;
    clearSelection: () => void;
}

export const useRouteStore = create<RouteState>()(
    persist(
        (set) => ({
            selectedRoute: null,
            origin: null,
            destination: null,
            setBookingSelection: (route, origin, destination) =>
                set({
                    selectedRoute: route,
                    origin,
                    destination,
                }),
            clearSelection: () =>
                set({
                    selectedRoute: null,
                    origin: null,
                    destination: null,
                }),
        }),
        {
            name: "route-booking-storage", // nama key di localStorage
        }
    )
);