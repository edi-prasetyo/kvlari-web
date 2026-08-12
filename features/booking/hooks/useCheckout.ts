"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { BookingPayload } from "../types/booking";
import { createBooking } from "../services/bookingService";

export const useCheckout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil user profil dari Auth Context / Global State
  const { profile } = useProfile();

  // Ambil query params dari rute sebelumnya
  const productId = Number(searchParams.get("product_id")) || 1;
  const routeId = Number(searchParams.get("transport_route_id")) || 1;
  const scheduleId = Number(searchParams.get("schedule_id")) || 2;
  const date = searchParams.get("date") || "2026-07-02";
  const origin = searchParams.get("origin") || "Bogor";
  const destination = searchParams.get("destination") || "Bandung";

  // Pre-fill state dengan data user dari Auth Context
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("point_balance");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set default nilai kontak saat data user siap
  useEffect(() => {
    if (profile) {
      setContactName(profile.name || "Angelita");
      setContactPhone(profile.phone || "081234567890");
    }
  }, [profile]);

  const handleBooking = async () => {
    setErrorMessage(null);

    if (!contactName.trim() || !contactPhone.trim()) {
      setErrorMessage("Nama kontak dan nomor telepon wajib diisi.");
      return;
    }

    const payload: BookingPayload = {
      product_id: productId,
      transport_route_id: routeId,
      schedule_id: scheduleId,
      contact_name: contactName,
      contact_phone: contactPhone,
      date: date,
      origin: origin,
      destination: destination,
      payment_method: paymentMethod,
    };

    try {
      setIsSubmitting(true);
      const res = await createBooking(payload);
      if (res.success) {
        router.push(`/booking/success?id=${res.data.booking_id}`);
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat memproses booking.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    profile,
    contactName,
    setContactName,
    contactPhone,
    setContactPhone,
    paymentMethod,
    setPaymentMethod,
    isSubmitting,
    errorMessage,
    bookingDetails: {
      date,
      origin,
      destination,
      scheduleId,
    },
    handleBooking,
  };
};
