import React from "react";
// import { Checkbox } from "@/components/ui/checkbox";

const ListView = () => {
  const tasks = ["Design UI", "Build API", "Write Docs"];

  return (
    <div className="space-y-3">
      {tasks.map((task, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
        >
          {/* <Checkbox /> */}
          <span>{task}</span>
        </div>
      ))}
    </div>
  );
};

export default ListView;
