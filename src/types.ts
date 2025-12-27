export type UserRole = "client" | "vendor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface AuthContextType { 
  user: User | null; 
  loading: boolean; 
  login: (userData: User) => void; 
  logout: () => void; 
}