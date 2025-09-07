import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="text-center py-20 px-6">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground leading-tight">
        Organize. Focus. <span className="text-foreground">Achieve.</span>
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-foreground dark:text-gray-300 mb-8">
        Taskzen is your personal task manager to keep you on track and boost productivity.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/project/create-project")}
          className=" flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg text-lg shadow-lg"
        >
          Go To Dashboard
          <ArrowRight size={21} />
        </button>
        <a
          href="https://github.com/Ume-ammara/taskzen"
          target="_blank"
          rel="noopener noreferrer"
          className=" flex items-center border border-muted-foreground text-foreground hover:bg-secondary/50 px-6 py-3 rounded-lg text-lg gap-2 text-center"
        >
          <FaGithub size={21} />
          <span className="leading-none">View Code</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
