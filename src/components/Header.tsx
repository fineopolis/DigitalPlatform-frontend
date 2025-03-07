'use client';
import React, { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/auth/profile");
        setUser(response.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
    }
    };

    fetchProfile();
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Platform digital</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </nav>
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>Logout</a>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </header>
  );
}