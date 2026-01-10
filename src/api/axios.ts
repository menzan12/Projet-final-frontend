import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
// MODIFICATION : Importation du store pour synchroniser l'état en cas d'erreur 401


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // INDISPENSABLE pour HttpOnly
});

// MODIFICATION : Ajout d'un intercepteur de réponse pour gérer l'expiration de session
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si l'API renvoie 401, cela signifie que le cookie est invalide ou expiré
    if (error.response && error.response.status === 401) {
      // On vide l'état utilisateur dans Zustand
      useAuthStore.getState().setUser(null);
    }
    return Promise.reject(error);
  }
);

export default api;