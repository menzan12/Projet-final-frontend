// src/services/authService.ts
import api from "../api/axios";
import type { LoginResponse } from "../types";


export const loginUser = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};