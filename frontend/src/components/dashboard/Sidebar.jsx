import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col ">
     
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-16 w-16 ">
        
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        {/* <p className="font-semibold text-lg">Sidra</p> */}
      </div>

      
      <div>
        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-blue-400">Projects</li>
          <li className="cursor-pointer hover:text-blue-400">Teams</li>
        </ul>
      </div>

      <div>
        <ul>
          <li className="cursor-pointer hover:text-blue-400 mt-96 ">⚙️ Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
