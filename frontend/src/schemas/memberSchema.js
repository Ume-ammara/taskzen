import z from "zod"

export const addMemberToProject = z.object({
    email: z.email("Email is required"),
    projectId:z.string().nonempty("Project id is required"),
    role: z.enum(AvaibleUserRoles).default("member")
})