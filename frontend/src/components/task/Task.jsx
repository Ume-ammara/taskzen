import {  X, CalendarDays, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useAuthStore } from "@/store/authStore";
import { useMemberStore } from "@/store/memberStore";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { taskSchema } from "@/schemas/taskSchema";
import { Textarea } from "../ui/textarea";

const Task = () => {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  const { projectId } = useParams();
  const { user } = useAuthStore();
  const { createTask, isLoading } = useTaskStore();
  const { members, fetchAllMembers } = useMemberStore();

  useEffect(() => {
    if (open && members === null) {
      fetchAllMembers(projectId);
    }
  }, [open, members, projectId, fetchAllMembers]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "todo",
      priority: "low",
      assignedTo: user?._id || "",
    },
  });


  const handleKeyDown = (e) => {
    const value = e.target.value.trim();
    if ((e.key === "Enter" || e.key === ",") && value) {
      e.preventDefault();
      if (!labels.includes(value)) {
        const newLabels = [...labels, value];
        setLabels(newLabels);
        setValue("labels", newLabels);
      }
      e.target.value = "";
    }
  };
  const removeLabel = (label) => {
    const updated = labels.filter((l) => l !== label);
    setLabels(updated);
    setValue("labels", updated);
  };


  useEffect(() => {
    if (!open) {
      reset();
      setLabels([]);
      setDate(new Date());
    }
  }, [open, reset]);

  const onSubmit = async (data) => {
    const taskData = {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: date.toISOString(),
      labels,
      attachments: data.attachments
        ? Array.from(data.attachments).map((file) => ({
            filename: file.name,
            mimetype: file.type,
            size: file.size,
          }))
        : [],
      assignedTo: data.assignedTo,
      assignedBy: user?._id,
      project: projectId,
    };
    await createTask(projectId, taskData);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <Plus className="w-4 h-4" /> New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Fill in details to create a new task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Task title" className="mt-2" />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

         
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description "
              {...register("description")}
              placeholder="Describe the task..."
              className="mt-2"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

        
          <div className="relative">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              value={date.toISOString().split("T")[0]}
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
              className="cursor-pointer mt-3"
            />
            <CalendarDays className="absolute right-3 top-9 text-gray-500 cursor-pointer" />
            {showCalendar && (
              <div className="absolute z-50 mt-2 bg-white border rounded-md shadow-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(val) => {
                    if (val) setDate(val);
                    setShowCalendar(false);
                  }}
                  initialFocus
                />
              </div>
            )}
          </div>

         
          <div className="grid grid-cols-3 gap-4">
            <div className="flex-1 ">
              <Label>Status</Label>
              <Select
                defaultValue="todo"
                
                onValueChange={(val) => setValue("status", val)}
              >
                <SelectTrigger className="mt-2" >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label>Priority</Label>
              <Select
                defaultValue="low"
                onValueChange={(val) => setValue("priority", val)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

                

            <div className="flex-1">
               <Label>Members</Label>
            <Select
              defaultValue={user?.username || ""}
              onValueChange={(val) => setValue("member", val)}
            >
              <SelectTrigger className="mt-2" >
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent  className="h-20">
                {members?.map((member) => (
                  <SelectItem key={member._id} value={member.user._id}>
                    {member.user.username || member.user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assignedTo && (
              <p className="text-sm text-red-500">
                {errors.assignedTo.message}
              </p>
            )}
            </div>
          </div>

      
     

         
          <div>
            <Label htmlFor="attachments">Attachments</Label>
            <Input
              id="attachments"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.svg"
              {...register("attachments")}
              className="mt-2"
            />
          </div>

        
          <div>
            <Label>Labels</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {labels.map((label) => (
                <span
                  key={label}
                  className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-sm"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() => removeLabel(label)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <Input
              type="text"
              placeholder="Press Enter or , to add labels"
              onKeyDown={handleKeyDown}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Task;
