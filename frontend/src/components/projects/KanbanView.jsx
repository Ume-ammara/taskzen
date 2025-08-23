import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KanbanView = () => {
  const columns = [
    { id: "todo", title: "To Do", tasks: ["Task 1", "Task 2"] },
    { id: "progress", title: "In Progress", tasks: ["Task 3"] },
    { id: "done", title: "Done", tasks: ["Task 4"] },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {columns.map((col) => (
        <div key={col.id} className="space-y-4">
          <h3 className="font-bold text-lg">{col.title}</h3>
          {col.tasks.map((task, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{task}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Some description here...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanView;
