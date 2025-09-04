import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTaskStore } from "@/store/taskStore";
import { Badge, Calendar } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const KanbanView = () => {
  const { tasks = [], fetchAllTasks, updateTaskStatus } = useTaskStore();
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      fetchAllTasks(projectId);
    }
  }, [fetchAllTasks, projectId]);

  const columns = [
    { id: "todo", title: "To Do", tasks: (tasks || []).filter((t) => t?.status === "todo") },
    { id: "in_progress", title: "In Progress", tasks: (tasks || []).filter((t) => t?.status === "in_progress") },
    { id: "done", title: "Done", tasks: (tasks || []).filter((t) => t?.status === "done") },
  ];

  const statusMap = {
    todo: "todo",
    in_progress: "in_progress",
    done: "done",
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newStatus = statusMap[destination.droppableId];

    const updateTask = tasks.map((t) =>
      t._id === draggableId ? { ...t, status: newStatus } : t
    )


    useTaskStore.setState({ tasks: updateTask });

    await updateTaskStatus(projectId, newStatus, draggableId);

  }
  const handleNavigate = (projectId, taskId) => {
    navigate(`/project/${projectId}/task/${taskId}`);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {columns.map((col) => (
          <Droppable key={col.id} droppableId={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-50 rounded-2xl shadow-sm p-4 min-h-[50vh] flex flex-col"
              >
                <h3 className="font-semibold text-lg mb-4">{col.title}</h3>

                <div className="flex-1 space-y-4">
                  {col.tasks.length === 0 && (
                    <p className="text-sm text-gray-400 italic"></p>
                  )}

                  {col.tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}

                          className="shadow-sm border hover:shadow-md transition cursor-pointer"
                          onClick={(e) => {
                            if (e.defaultPrevented) return;
                            handleNavigate(task.project, task._id)
                          }}
                        >
                          <CardHeader>
                            <CardTitle className="text-base flex justify-between items-center">
                              {task.title}

                            </CardTitle>
                          </CardHeader>

                          <CardContent className="space-y-3">
                            <p className="text-sm text-gray-600">{task.description}</p>


                            <div className="flex flex-wrap gap-2">
                              {task.tags?.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="rounded-full">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>Assigned:</span>
                                <Avatar className="h-6 w-6 border rounded-full">
                                  <AvatarImage src={task.assignee?.avatar} />
                                  <AvatarFallback>
                                    {task.assignedTo?.fullname?.[0] || "?"}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate max-w-[80px]">
                                  {task.assignedTo?.fullname || "Unassigned"}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}


                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
export default KanbanView;
