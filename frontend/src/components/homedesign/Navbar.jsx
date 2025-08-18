import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
      <h1 
        onClick={() => navigate("/")} 
        className="text-2xl font-bold cursor-pointer"
      >
        Taskzen
      </h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/auth/login")}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/auth/signup")}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          Sign Up
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
