import { Project } from "../models/project.models.js";
import {
  addMemberToProject,
  createProjectSchema,
  getProjectByIdSchema,
  removeMemberSchema,
  roleUpdateSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { UserRolesEnum } from "../utils/constants.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js";

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
    user: createdId,
    role: UserRolesEnum.PROJECT_ADMIN,
  });

  if (!projectMember) {
    throw new ApiError(500, "Unable to create project member");
  }

  return res.status(200).json(
    new ApiResponse(200, "Project created successfully", {
      project,
      projectMember,
    }),
  );
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = getProjectByIdSchema.parse({
    projectId: req.params.projectId,
  });

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found ");
  }

  return res.status(200).json(new ApiResponse(200, "Project found", project));
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const projectMember = await ProjectMember.find({ user: userId });

  const findProjectMember = projectMember.map((proj) => proj.project);
  console.log("Project Id", findProjectMember);

  const projects = await Project.find({ _id: { $in: findProjectMember } });

  if (projects.length === 0) {
    throw new ApiError(404, "No projects found for this user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully", projects));
});

export const updateProject = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const id = req.params?.projectId;

  const { projectId, name, description } = updateProjectSchema.parse({
    ...req.body,
    projectId: id,
  });

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
    },
    { new: true, runValidators: true },
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", updatedProject));
});

export const addMemberController = asyncHandler(async (req, res) => {
  const { email, role, projectId } = addMemberToProject.parse({
    ...req.body,
    project: req.params?.projectId,
  });
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isAlreadyMember = await ProjectMember.findOne({
    user: user._id,
    project: projectId,
  });
 
  if (isAlreadyMember) {
    throw new ApiError(409, "User already exist in this project");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Not found");
  }
  const projectMember = await ProjectMember.create({
    project: projectId,
    user: user._id,
    role,
  });

  if (!projectMember) {
    throw new ApiError(500, "Unable to create project member");
  }
  return res.status(200).json(new ApiResponse(200, "Member added successfully", projectMember));
});

export const roleUpdate = asyncHandler(async (req, res) => {
  const { role , memberId} = roleUpdateSchema.parse({
    ...req.body,
    memberId: req.params?.memberId,
  });

  const member = await ProjectMember.findById(memberId)
  console.log("member", member)
  if(!member){
      throw new ApiError(404, "Project member not found ")
  }

  if(member.role === role){
    throw new ApiError(403, "User have already role")
  }

  member.role = role
  const updateRole = await member.save()

  return res.status(200).json(
  new ApiResponse(200, "Role updated successfully", updateRole)
);

});

export const removeProjectMember = asyncHandler(async(req, res)=>{
  const {email , projectId} = removeMemberSchema.parse({...req.body, projectId: req.params?.projectId}) 

  const user = await User.findOne({email})
  if(!user){
    throw new ApiError(404, "User not found")
  }

  const member = await ProjectMember.findOneAndDelete({project: projectId, user: user._id})
  if(!member){
    throw new ApiError(404, "Project member not found")
  }

  return res.status(200).json(new ApiResponse(200, "Member removed successfully", member))

})

export const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params?.projectId;
  const userId = req.user?._id;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.createdBy.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this project");
  }

  const deleteProject = await Project.findByIdAndDelete(projectId);
  return res
    .status(200)
    .json(new ApiResponse(200, "Project successfully deleted", deleteProject));
});
