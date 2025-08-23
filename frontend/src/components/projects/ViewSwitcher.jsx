import React from "react";
import { LayoutGrid, List, Table } from "lucide-react";

const ViewSwitcher = ({ activeView, setActiveView }) => {
  const tabs = [
    { id: "kanban", label: "Kanban", icon: LayoutGrid },
    { id: "list", label: "List", icon: List },
    { id: "table", label: "Table", icon: Table },
  ];

  return (
    <div className="flex gap-3 border-b pb-2">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveView(id)}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
            activeView === id
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Icon size={16} /> {label}
        </button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
