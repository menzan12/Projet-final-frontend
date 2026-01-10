export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface Booking {
  _id: string;
  bookingDate: string;
  timeSlot?: string;
  time?: string; // AJOUTÉ pour corriger dashClient.tsx:235
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  currency: string;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  address?: {
    street: string;
    city: string;
    zipCode: string;
  };
  email?: string;
  phone?: string;
  status: BookingStatus;
  notes?: string;
  cancelReason?: string;

  service: {
    _id: string;
    title: string;
    images?: string[];
    category?: string;
  };
  
  vendor: {
    _id: string;
    name: string;
    phone?: string;
    avatar?: string;
  };
  
  client: { 
    _id: string;
    name: string;
    avatar?: string;
  };
}