export type ServiceStatus = "active" | "inactive" | "pending";

export interface Service {
  _id: string;
  title: string;
  description: string;
  // Modifié pour accepter soit l'objet complexe du backend, soit le string simplifié
  category: string | { name: string; count: number }[];
  price: number;
  images: string[]; 
  city: string;
  address?: string;
  rating: number;
  reviewCount: number;
  provider: string;
  vendorId: string;
  vendorAvatar?: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  count: number;
  icon?: string;
}