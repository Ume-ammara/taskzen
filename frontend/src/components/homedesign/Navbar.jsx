import React, { useState } from "react";
import { Bell, User } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Navbar = () => {
  return (
    <header className=" left-0 w-full border-b border-sidebar-border shadow-sm px-6 py-3 flex items-center justify-between  top-0 z-50">

      {/* Left (Logo / Title) */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-sidebar-foreground">Taskzen</span>
      </div>

      {/* Right (Notifications + User) */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <Button variant="ghost" size="icon" className="relative text-sidebar-foreground">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-sidebar-accent"
            >
              <User className="h-6 w-6" />
              <span className="hidden sm:block">Sidra</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-sidebar text-sidebar-foreground border border-sidebar-border">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuRadioItem>Settings</DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem className="text-red-600">Logout</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default Navbar;
