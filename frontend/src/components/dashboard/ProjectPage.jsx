import { useState } from "react";
import { Plus } from "lucide-react";

export default function ProjectsPage({ setPage, setActiveProject }) {
  const [projects, setProjects] = useState(["Taskzen Demo"]);

  const addProject = () => {
    const name = prompt("Enter project name:");
    if (name) setProjects([...projects, name]);
  };

  return (
    <div className="p-6 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Create Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj, i) => (
          <div
            key={i}
            onClick={() => {
              setActiveProject(proj);
              setPage("projectDetail");
            }}
            className="p-4 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200"
          >
            <h3 className="font-semibold">{proj}</h3>
            <p className="text-sm text-gray-600">Click to open</p>
          </div>
        ))}
      </div>
    </div>
  );
}
