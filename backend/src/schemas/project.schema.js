import {z} from "zod"
import { AvaibleUserRoles } from "../utils/constants"

export const createProjectSchema = z.object({
    name:z.string().trim().min(4, "Name must be at least 4 characters"),
    description: z.string().trim().max(50, "Description must not exceed 50 characters"),
    createdBy: z.string().trim().min(1, "")

})

export const getProjectByIdSchema = z.object({
    projectId: z.string().trim().nonempty("Project id is required")
})

export const updateProject = z.object({
    projectId: z.string().nonempty("Project id is required"),
    name:z.string().trim().min(4, "Name must be at least 4 characters"),
    description: z.string().trim().max(50, "Description must not exceed 50 characters"),
    createdBy: z.string().trim().min(1, "")
})

export const addMemberToProject = z.object({
    username: z.string().trim().min(4, "Name must be at least 4 character"),
    projectId:z.string().nonempty("Project id is required"),
    role: z.enum(AvaibleUserRoles).default("member")
})

export const getProjectMembers = z.object({
    projectId:z.string().nonempty("Project id is required"),

})

