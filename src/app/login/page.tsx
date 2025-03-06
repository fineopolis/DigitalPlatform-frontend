"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import apiClient from "../../../services/apiClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();



  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { access_token, user } = response.data;
        console.log(access_token);
      // Stocker le token JWT dans les cookies
      Cookies.set("token", access_token, { expires: 7 });

      // Rediriger en fonction du rôle de l'utilisateur
    //   if (user.role === "ADMIN") router.push("/admin");
    //   else if (user.role === "CLIENT") router.push("/client");
    //   else router.push("/consultant");
    router.push("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Échec de la connexion");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
