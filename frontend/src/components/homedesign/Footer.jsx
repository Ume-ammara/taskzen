import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-muted text-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between border-t ">
        
       
        <div className="flex items-center space-x-2">
          <span className="text-foreground font-bold text-lg">Taskzen</span>
          <span className="text-[#555555]">© {new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
