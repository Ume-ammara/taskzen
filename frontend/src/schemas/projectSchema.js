import {z} from "zod"
export const createProjectSchema = z.object({
    name:z.string().trim().min(4, "Name must be at least 4 characters"),
    description: z.string().trim().max(50, "Description must not exceed 50 characters"),
    createdBy: z.string().trim().min(1, "")

})