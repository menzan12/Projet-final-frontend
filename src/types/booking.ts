// src/types/booking.ts

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface BookingAddress {
  street: string;
  city: string;
  zipCode: string;
}

export interface BookingService {
  _id: string;
  title: string;
  name?: string; // Optionnel pour la compatibilité backend
  images?: string[];
  category?: string;
}

export interface BookingUser {
  _id: string;
  name: string;
  phone?: string;
  avatar?: string;
  email?: string;
}

// L'interface principale qui causait l'erreur
export interface Booking {
  _id: string;
  bookingDate: string;
  timeSlot?: string;
  time?: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  currency: string;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  address?: BookingAddress;
  email?: string;
  phone?: string;
  status: BookingStatus;
  notes?: string;
  cancelReason?: string;
  service: BookingService;
  vendor: BookingUser;
  client: BookingUser;
}

export interface CreateBookingDTO {
  serviceId: string;
  slot: {
    day: string;
    date: string;
    time: string;
  };
  notes?: string;
}