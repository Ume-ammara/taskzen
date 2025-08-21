// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Bell, User, Search } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";

// const Topbar = () => {
//   return (
//     <header className=" left-0 w-full border-b border-sidebar-border shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      
//       {/* Left (Logo / Title) */}
//       <div className="flex items-center gap-2">
//         <span className="text-2xl font-bold text-sidebar-foreground">Taskzen</span>
//       </div>

//       {/* Center (Search) */}
//       <div className="flex-1 flex justify-center">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/50 h-5 w-5" />
//           <Input
//             type="text"
//             placeholder="Search projects..."
//             className="w-full pl-10 rounded-full bg-sidebar-accent border-none focus:ring-2 focus:ring-sidebar-accent-foreground text-sidebar-foreground"
//           />
//         </div>
//       </div>

//       {/* Right (Notifications + User) */}
//       <div className="flex items-center gap-4">
//         {/* Notification Icon */}
//         <Button variant="ghost" size="icon" className="relative text-sidebar-foreground">
//           <Bell className="h-6 w-6" />
//           <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
//         </Button>

//         {/* User Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-sidebar-accent"
//             >
//               <User className="h-6 w-6" />
//               <span className="hidden sm:block">Sidra</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-40 bg-sidebar text-sidebar-foreground border border-sidebar-border">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// };

// export default Topbar;


