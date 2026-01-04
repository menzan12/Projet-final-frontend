import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;

  // Si l'utilisateur n'est pas admin, on le renvoie à l'accueil
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
