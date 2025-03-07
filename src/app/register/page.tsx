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
    <div className="w-full mt-[10%] flex  py-[10%] flex-col items-center justify-center">
      <div className="lg:w-1/2 w-full border-2 flex flex-col space-y-[3%] justify-between items-center">
      <h1 className="font-bold text-xl">Page de Inscription</h1>
        <input
        className=" sm:w-[50%]  w-[90%] rounded-2xl border-2 px-6 py-2  bg-white "
          type="text"
          placeholder="Nom"
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
        className=" sm:w-[50%]  w-[90%] rounded-2xl border-2 px-6 py-2  bg-white "
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        className=" sm:w-[50%]  w-[90%] rounded-2xl border-2 px-6 py-2  bg-white "
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}
            className=" sm:w-[50%]  w-[90%] rounded-2xl border-2 px-6 py-2  bg-white ">
          <option className="bg-white"
           value="CONSULTANT">Consultant</option>
          <option value="CLIENT">Client</option>
        </select>
        <div className="flex space-x-4">
        <button className=" bg-blue-500  text-white font-bold p-2 rounded-full" onClick={handleRegister}>S'inscrire</button>
        <button className=" border-blue-500  border-2 hover:bg-blue-500 hover:text-white text-black font-bold p-2 rounded-full" onClick={()=>router.push("/login")}>Se connecter</button>

      </div>
      </div>
    </div>
  );
}
