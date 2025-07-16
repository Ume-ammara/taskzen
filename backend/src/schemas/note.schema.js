import z from "zod"

export const createProjectNoteSchema = z.object({
     project : z.string().trim().min(1, "Project id is required"),
     createdBy: z.string().trim().min(1, "User id is required"),
     content : z.string().trim().min(1, "Project note is required")
})

export const updateProjectNoteSchema = z.object({
    project : z.string().trim().min(1, "Project id is required"),
    noteId: z.string().trim().min(1, "Note id is required"),
    content : z.string().trim().min(1, "Project note is required")
})

export const getProjectNoteByIdSchema = z.object({
    project : z.string().trim().min(1, "Project id is required"),
    noteId: z.string().trim().min(1, "Note id is required"),
})

export const getAllProjectNoteSchema = z.object({
     project : z.string().trim().min(1, "Project id is required"),
})

export const deleteProjectNoteSchema = z.object({
    project : z.string().trim().min(1, "Project id is required"),
    noteId: z.string().trim().min(1, "Note id is required"),
})