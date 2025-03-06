import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data; // Renvoie l'utilisateur et le token
};

export const getUserProfile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data.user;
};

export const register = async (name: string, email: string, password: string, role: string) => {
    const response = await apiClient.post("/auth/register", { name, email, password, role });
    return response.data; // Renvoie l'utilisateur créé
  };