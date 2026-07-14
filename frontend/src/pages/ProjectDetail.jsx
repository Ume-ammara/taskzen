import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectStore } from "@/store/projectStore";
import Navbar from "@/components/homedesign/Navbar";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ViewSwitcher from "@/components/projects/ViewSwitcher";
import AddMember from "@/components/task/AddMember";
import Task from "@/components/task/Task";
import KanbanView from "@/components/projects/KanbanView";
import ListView from "@/components/projects/ListView";
import TableView from "@/components/projects/TableView";


const ProjectDetail = () => {
  const [activeView, setActiveView] = useState("kanban");

  const { getProject, project } = useProjectStore();
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
  }, [projectId, getProject]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="w-full p-6 space-y-6">
      <Navbar />

      <ProjectHeader />

      {/* View Switcher + Action Buttons */}
      <div className="flex items-center justify-between">
        <ViewSwitcher
          activeView={activeView}
          setActiveView={setActiveView}
        />

        <div className="flex items-center gap-3">
          <AddMember />
          <Task />
        </div>
      </div>

      {/* Project Views */}
      <div className="mt-6">
        {activeView === "kanban" && <KanbanView />}
        {activeView === "list" && <ListView />}
        {activeView === "table" && <TableView />}
      </div>
    </div>
  );
};

export default ProjectDetail;