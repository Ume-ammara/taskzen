export default function ProjectDetail({ project }) {
  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="p-6 flex-1">
      <h2 className="text-xl font-bold mb-6">{project} - Project Board</h2>

      <div className="grid grid-cols-3 gap-6">
        {columns.map((col, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-4">
            <h3 className="font-semibold mb-3">{col}</h3>
            <div className="space-y-3">
              {/* Placeholder tasks */}
              <div className="p-3 bg-white rounded-lg shadow">Sample Task 1</div>
              <div className="p-3 bg-white rounded-lg shadow">Sample Task 2</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
