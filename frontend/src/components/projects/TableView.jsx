import React from "react";

const TableView = () => {
  const tasks = [
    { title: "Setup Project", status: "Done", assignee: "Ali" },
    { title: "Build Auth", status: "In Progress", assignee: "Sara" },
    { title: "Design UI", status: "To Do", assignee: "Ahmed" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-xl overflow-hidden bg-white shadow-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Task</th>
            <th className="p-3">Status</th>
            <th className="p-3">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-3">{task.title}</td>
              <td className="p-3">{task.status}</td>
              <td className="p-3">{task.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
