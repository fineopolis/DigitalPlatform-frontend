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
    <div className="w-full mt-[10%] flex  py-[10%] flex-col items-center justify-center">
        <div className="lg:w-1/2 w-full border-2 flex flex-col space-y-[3%] justify-between items-center">
      <h1 className="font-bold text-xl">Page Connexion</h1>
      <input className=" sm:w-[50%]  w-[90%] rounded-2xl border-2 px-6 py-2  bg-white " type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className=" sm:w-[50%] w-[90%] rounded-2xl border-2 px-6 py-2 " type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
      <div className="flex space-x-4">
      <button className=" bg-blue-500  text-white font-bold p-2 rounded-full" onClick={handleLogin}>Se connecter</button>
      <button className=" border-blue-500  border-2 hover:bg-blue-500 hover:text-white text-black font-bold p-2 rounded-full" onClick={()=>router.push("/register")}>S'inscrire</button>
      </div>
    </div>
    </div>
  );
}
