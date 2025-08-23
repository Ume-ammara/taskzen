import z from "zod"

export const createTaskSchema = z.object({
  userId: z.string().trim().min(1, "User id is required"),
  project: z.string().trim().min(1, "project id is required"),
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
  assignedTo: z.string().trim().min("User id is required"),

  status: z.enum(AvaibleTaskStatus).default("todo"),

  attachments: z.array(
    z.object({
      url: z.url("Please provide a valid URL").optional(),
      mimetype: z
        .string()
        .min(5, "Mimetype must be a valid file type")
        .optional(),
      size: z.number().optional(),
    }),
  ),
});