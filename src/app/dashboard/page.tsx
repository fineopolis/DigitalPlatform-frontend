"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import apiClient from "../../../services/apiClient";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        router.push("/login"); // Rediriger si l'utilisateur n'est pas authentifié
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Bienvenue, {user.name} !</h2>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>
      <button onClick={handleLogout}>Se Déconnecter</button>
    </div>
  );
}
