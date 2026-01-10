import { create } from 'zustand';
import api from "../api/axios";
import type { AuthState, LoginCredentials, RegisterData } from '../types';
import type { User } from "../types";



export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/me");
      console.log("[AuthStore] Session récupérée :", res.data);
      set({ 
        user: res.data, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      console.log("[AuthStore] Aucune session active");
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/login", credentials);
      const user = res.data.user;
      console.log("[AuthStore] Login réussi. Profil complété ?", user.isProfileCompleted);
      set({ user, isAuthenticated: true, loading: false });
      return user;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // MODIFICATION : Ajout de la fonction register
  register: async (data: RegisterData) => {
    set({ loading: true });
    try {
      await api.post("/auth/register", data);
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  setUser: (user: User | null) => set({ 
    user, 
    isAuthenticated: !!user 
  }),

  setLoading: (status: boolean) => set({ loading: status }),

  // MODIFICATION : Logout appelle le backend pour supprimer le cookie HttpOnly
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      // On vide le store même si la requête échoue
      set({ user: null, isAuthenticated: false });
      window.location.href = "/login";
    }
  },
}));