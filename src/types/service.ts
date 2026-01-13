export type ServiceStatus = "active" | "inactive" | "pending";

// Structure pour l'objet disponibilité
export interface Availability {
  day: string;
  active: boolean;
  slots?: string[];
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  // Utilisation d'un type plus précis pour éviter l'erreur ReactNode
  category: string | { name: string; count: number }[]; 
  price: number;
  images: string[]; 
  city: string;
  address?: string;
  rating: number;
  reviewCount: number;
  provider: string;
  vendorId: string;
  // Ajout de l'objet vendor (souvent retourné par .populate() en backend)
  vendor?: {
    _id: string;
    name: string;
    avatar?: string;
  };
  vendorAvatar?: string;
  status: ServiceStatus;
  // Ajout de la propriété manquante signalée par tes erreurs
  availability?: Availability[]; 
  createdAt: string;
  updatedAt: string;
}