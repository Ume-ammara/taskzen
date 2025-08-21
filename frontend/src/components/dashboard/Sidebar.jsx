import { User, Settings, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Sidebar() {
  return (
    <aside className="w-64  bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col ">
      

     
      <div className="p-4 flex flex-col items-center space-y-3 border-b border-sidebar-border">

       
        <label className="relative w-16 h-16 cursor-pointer rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
          <User className="w-8 h-8 text-gray-500" />
        </label>
        <p className="text-sm font-medium">Upload Profile</p>
      </div>

     
      <nav className="flex-1 p-2 space-y-1">
      
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <FolderKanban className="w-4 h-4" />
          Projects
        </Button>
      </nav>

    
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
}


export default Sidebar;

