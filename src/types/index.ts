export type UserRole = "client" | "vendor" | "admin";

export interface User {
  _id: string; 
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}


export interface Service {
 _id: string;
  title: string;
  vendor: {
  name: string;
  images?: string[];
};
  description: string;
  category: string;
  price: number;
  images?: string[];
  provider: string;
  city: string;
  rating: number;
}

 export interface BreadcrumbsProps {
  service?: {
    _id: string;
    title?: string;
    name?: string;
    category?: string;
  };
}

export type BookingStatus = "pending"| "confirmed" | "cancelled" | "completed";
export interface Booking {
  _id: string;
  bookingDate: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
 service: {
    _id: string;
    title: string;
    images?: string[];
  };
 vendor: {
    _id: string;
    name: string;
  };
  client: { 
    _id: string;
    name: string;
  };
 createdAt: string;
}

export interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email?: string;
  };
  receiver: {
    _id: string;
    name: string;
    email?: string;
  };
  content: string;
  isRead: boolean;
  createdAt: string;
}


export interface VendorStats {
  currentMonthRevenue: number;
  revenueGrowth: number;
  pendingServices: number;
}

