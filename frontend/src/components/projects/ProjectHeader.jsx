import { useProjectStore } from "@/store/projectStore";
import React from "react";

const ProjectHeader = () => {
  const { project } = useProjectStore()
  console.log('project:::', project)

  return (
    <div className="  rounded-2xl border p-4 shadow-sm bg-white">
      <h1 className="text-xl font-bold">{project?.name}🚀</h1>
      <p className="text-gray-600">
        {project?.description}
      </p>
      <div className="flex gap-6 text-sm mt-2 text-gray-500">
        <span>📅 Created: {new Date(project?.createdAt).toLocaleDateString()
        }</span>
        <span>🕒 Updated: {new Date(project?.updatedAt).toLocaleDateString()}
        </span>
        <span>👤 Owner: {project?.createdBy.username} </span>
      </div>
    </div>
  );

}

export default ProjectHeader;
