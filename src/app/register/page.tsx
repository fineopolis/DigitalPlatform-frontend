"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../../services/authService";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CONSULTANT"); // Valeur par défaut
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(name, email, password, role);
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      router.push("/login"); // Redirige vers la page de connexion après l'inscription
    } catch (error: any) {
      alert(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input type="text" placeholder="Nom" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
      
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="CONSULTANT">Consultant</option>
        <option value="CLIENT">Client</option>
      </select>

      <button onClick={handleRegister}>S'inscrire</button>
    </div>
  );
}
