// home/components/RouteCard.tsx
import { TransportRoute } from "../types/transport";
import { useRouter } from "next/navigation";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

interface RouteCardProps {
  route: TransportRoute;
}

export const RouteCard = ({ route }: RouteCardProps) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col justify-between overflow-hidden">
      <div>
        {/* Card Header */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-gray-900">{route.name}</h2>
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                route.is_active === 1
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {route.is_active === 1 ? "Aktif" : "Non-aktif"}
            </span>
          </div>
          <p className="text-sm text-gray-600">{route.description}</p>
        </div>

        {/* Route Stops / Timeline */}
        <div className="p-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Titik Pemberhentian ({route.route_stops.length} Halte)
          </h3>

          <div className="relative pl-6 space-y-4">
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-blue-200" />

            {route.route_stops
              .sort((a, b) => a.stop_order - b.stop_order)
              .map((stop, index) => (
                <div key={stop.id} className="relative flex items-start">
                  <div
                    className={`absolute -left-[20px] top-1 w-3 h-3 rounded-full border-2 bg-white ${
                      index === 0
                        ? "border-blue-600 bg-blue-600"
                        : index === route.route_stops.length - 1
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 leading-none">
                      {stop.city.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {stop.city.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div>
          <span className="text-xs text-gray-500 block">Harga Per Tiket</span>
          <span className="text-lg font-bold text-blue-600">
            {formatRupiah(route.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/schedule?id=${route.id}`)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition shadow-sm"
        >
          Pilih Rute
        </button>
      </div>
    </div>
  );
};
