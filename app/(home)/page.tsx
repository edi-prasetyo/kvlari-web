// app/(home)/page.tsx
"use client";

import { useTransportRoutes } from "@/features/home/hooks/useTransportRoutes";
import { Hero } from "@/features/home/components/Hero";
import { RouteCard } from "@/features/home/components/RouteCard";

export default function HomePage() {
  const { routes, serverTime, activeType, loading, error } =
    useTransportRoutes();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {activeType == "afternoon"
                ? "Mau pulang kemana?"
                : "Mau berangkat darimana?"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Daftar rute shuttle dan titik pemberhentian yang tersedia.
            </p>
          </div>

          {serverTime && (
            <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm text-blue-900">
              <div>
                <span className="font-semibold">Sekarang Jam:</span>{" "}
                {serverTime}
              </div>

              <span className="text-blue-300">|</span>

              <div>
                <span className="font-semibold">Sesi:</span>{" "}
                <span className="capitalize bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                  {activeType == "afternoon" ? "Sore" : "Pagi"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    </>
  );
}
