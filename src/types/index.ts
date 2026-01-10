export type UserRole = "client" | "vendor" | "admin";
export type VendorPlan = "free" | "pro" | "premium";

export interface User {
  _id: string; 
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isAdminApproved: boolean;   
  isProfileComplete: boolean;
  isEmailVerify: boolean;
  
  // --- Corrections pour Profil.tsx, ProfilVendor.tsx et DashVendor ---
  phone?: string;
  bio?: string;
  vendorPlan?: VendorPlan;
  isWaitingApproval?: boolean;
  serviceMainImage?: string;
  verified?: boolean; // Utilisé dans Profil.tsx
  address?: {
    street: string;
    city: string;
    zip: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (status: boolean) => void;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface ApiResponse {
  message: string;
}

// Changé de "Breadcrumbs" à "BreadcrumbsProps" pour éviter l'erreur TS1485 (conflit type/composant)
export interface BreadcrumbsProps {
  service?: {
    _id: string;
    title?: string;
    name?: string;
    category?: string;
  };
}

export interface VendorStats {
  currentMonthRevenue: number;
  revenueGrowth: number;
  pendingServices: number;
}