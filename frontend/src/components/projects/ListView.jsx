
import { useTaskStore } from "@/store/taskStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ListView = () => {
  const { tasks, fetchAllTasks } = useTaskStore()
  const { projectId } = useParams()

  console.log("fetch allTask ::", tasks)

  useEffect(() => {
    if (projectId) {
      fetchAllTasks(projectId)
    }
  }, [projectId])

  return (
    <div className="space-y-3">
      {tasks.map((task, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 mb-10 bg-white rounded-xl shadow-sm"
        >
          {/* <Checkbox /> */}
          <span>{task.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ListView;
