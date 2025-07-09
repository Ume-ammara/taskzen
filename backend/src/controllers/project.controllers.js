import { Project } from "../models/project.models.js";
import { createProjectSchema } from "../schemas/project.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { UserRolesEnum } from "../utils/constants.js";
import { ProjectMember } from "../models/projectmember.models.js";

export const createProject = asyncHandler(async (req, res) => {
  const { name, description } = createProjectSchema.parse(req.body);
  const createdId = req.user._id;
  const existingProject = await Project.findOne({ name });
  if (existingProject) {
    throw new ApiError(409, "Project with this name already exists");
  }
  const project = await Project.create({
    name,
    description,
    createdBy: createdId,
  });

  const projectMember = await ProjectMember.create({
      project: project._id,
      user : createdId,
      role: UserRolesEnum.PROJECT_ADMIN,

  })

  if(!projectMember){
     throw new ApiError(500, "Unable to create project member")
  }

  return res.status(200).json(
    new ApiResponse(200, "Project created successfully", {
      project,
      projectMember
    }),
  );
});
