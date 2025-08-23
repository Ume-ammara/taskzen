import Navbar from "@/components/homedesign/Navbar";
import KanbanView from "@/components/projects/KanbanView";
import ListView from "@/components/projects/ListView";
import ProjectHeader from "@/components/projects/ProjectHeader";
import TableView from "@/components/projects/TableView";
import ViewSwitcher from "@/components/projects/ViewSwitcher";
import { useProjectStore } from "@/store/projectStore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const [activeView, setActiveView] = useState("kanban");
  const { getProject, project } = useProjectStore();
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
  }, [projectId, getProject]);

  if (!project) return <div>Loading .....</div>;

  return (
    <div className=" w-full p-6 space-y-6">
      <Navbar />
      <ProjectHeader />

      <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />

      <div className="flex flex-1 justify-between overflow-hidden">
        <div className="mt-6 flex-1 p-4 overflow-y-auto">
          {activeView === "kanban" && <KanbanView />}
          {activeView === "list" && <ListView />}
          {activeView === "table" && <TableView />}
        </div>
       
      </div>
    </div>
  );
};

export default ProjectDetail;
