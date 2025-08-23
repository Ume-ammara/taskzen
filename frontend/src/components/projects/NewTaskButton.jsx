import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const NewTaskButton = () => {
  return (
    <Button className="w-full mt-auto bg-black text-white rounded-xl">
      <Plus className="mr-2 h-4 w-4" /> New Task
    </Button>
  );
};

export default NewTaskButton;
