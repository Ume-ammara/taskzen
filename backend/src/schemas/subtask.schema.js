import z from "zod";

export const createSubTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(50, "Title must be at most 50 characters"),
  taskId: z.string().trim().min(1, "Task id is required"),
  isCompleted: z.boolean().default(false),
  userId: z.string().trim().min(1, "User id is required"),
  projectId : z.string().trim().min(1, "Project id is required")
});

export const updateSubTaskSchema = z.object({
  subTaskId: z.string().trim().min(1, "Sub-task id is required"),
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(50, "Title must be at most 50 characters").optional(),
  taskId: z.string().trim().min(1, "Task id is required"),
  isCompleted: z.boolean().default(false).optional(),
  userId: z.string().trim().min(1, "User id is required"),
  projectId : z.string().trim().min(1, "Project id is required"),
  
})

export const getSubTaskByIdSchema = z.object({
    subTaskId: z.string().trim().min(1, "Sub-task id is required"),
    taskId: z.string().trim().min(1, "Task id is required"),
    projectId : z.string().trim().min(1, "Project id is required")
})

export const deleteSubTaskSchema = z.object({
    subTaskId: z.string().trim().min(1, "Sub-task id is required"),
    taskId: z.string().trim().min(1, "Task id is required"),
    projectId : z.string().trim().min(1, "Project id is required")
})