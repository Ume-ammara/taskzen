import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="text-center py-20 px-6">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Organize. Focus. <span className="text-blue-500">Achieve.</span>
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8">
        Taskzen is your personal task manager to keep you on track and boost productivity.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/project/create-project")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/auth/login")}
          className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-lg text-lg"
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Hero;
