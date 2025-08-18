import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


const Topbar = () => {
  return (
    <header className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left (Logo / Title) */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-black">Taskzen</span>
      </div>

      {/* Center (Search) */}
      <div className="flex-1 flex justify-center">
        <Input
          type="text"
          placeholder="Search project ..."
          className="w-1/2"
        />
      </div>

      {/* Right (Notifications + User) */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 size-7 text-gray-600" />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full px-3 py-1"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span className="hidden sm:block">Sidra</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuRadioItem>Settings</DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
