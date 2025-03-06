import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data; // Renvoie l'utilisateur et le token
};

export const getUserProfile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data.user;
};
