export type UserRole = "client" | "vendor" | "admin";

export interface User {
  id: string;
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
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}


export interface Service {
 _id: string;
  title: string;
  vendor: {
  name: string;
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