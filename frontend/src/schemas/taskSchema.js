import z from "zod"

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .trim()
    .min(50, "Description must be at least 50 characters")
    .max(150, "Description must be at most 150 characters"),

  status:  z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  dueDate: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number")
      return new Date(val);
    return val;
  }, z.date().optional()),
  labels: z.array(z.string()).default([]),
  attachments: z.any().optional(),
  assignedTo: z.string().optional(),
  assignedBy: z.string().optional(),
  project: z.string().optional(),

});