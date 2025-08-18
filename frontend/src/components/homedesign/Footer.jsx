import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700">
        
       
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold text-lg">Taskzen</span>
          <span className="text-gray-400">© {new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
