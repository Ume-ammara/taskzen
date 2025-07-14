import {z} from "zod"
import { AvaibleUserRoles } from "../utils/constants.js"

export const createProjectSchema = z.object({
    name:z.string().trim().min(4, "Name must be at least 4 characters"),
    description: z.string().trim().max(50, "Description must not exceed 50 characters"),
    createdBy: z.string().trim().min(1, "")

})

export const getProjectByIdSchema = z.object({
    projectId: z.string().trim().nonempty("Project id is required")
})

export const updateProjectSchema = z.object({
    projectId: z.string().nonempty("Project id is required"),
    name:z.string().trim().min(4, "Name must be at least 4 characters"),
    description: z.string().trim().max(50, "Description must not exceed 50 characters"),
    
})

export const addMemberToProject = z.object({
    email: z.string().trim().email("Email is required"),
    projectId:z.string().nonempty("Project id is required"),
    role: z.enum(AvaibleUserRoles).default("member")
})

export const getProjectMembers = z.object({
    projectId:z.string().nonempty("Project id is required"),

})

export const roleUpdateSchema = z.object({
    memberId :z.string().trim().nonempty("member is required"),
    role: z.enum(AvaibleUserRoles).default("member")
    
})

export const removeMemberSchema = z.object({
    projectId: z.string().trim().nonempty("Project id is required"),
    email: z.string().trim().email("Email is required"),
})

