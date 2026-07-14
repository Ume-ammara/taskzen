import z from "zod";

export const addMemberToProject = z.object({
  email: z.email("Invalid email"),
  role: z.enum(["member", "project_admin"]),
});
