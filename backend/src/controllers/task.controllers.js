import { Task } from "../models/task.models.js";
import {
  createTaskSchema,
  deleteTaskSchema,
  getAllTasksOfProjectSchema,
  getTaskByIdSchema,
  updateStatusSchema,
  updateTaskSchema,
} from "../schemas/task.schema.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { UserRolesEnum } from "../utils/constants.js";

export const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    status,
    attachments,
    assignedTo,
    userId,
    dueDate,
    project,
  } = createTaskSchema.parse({
    ...req.body,
    userId: req.user?._id,
    project: req.params?.projectId,
  });

  const task = await Task.create({
    title,
    description,
    status,
    attachments,
    assignedTo,
    dueDate,
    assignedBy: userId,
    userId,
    project,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Task created successfully", task));
});

export const updateTaskController = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    assignedTo,
    status,
    attachments,
    userId,
    taskId,
    project,
  } = updateTaskSchema.parse({
    ...req.body,
    taskId: req.params?.taskId,
    project: req.params?.projectId,
    userId: req.user?._id,
  });
  const updateTask = await Task.findByIdAndUpdate(
    taskId,
    {
      title,
      description,
      assignedTo,
      status,
      attachments,
      project,
      assignedBy: userId,
    },
    { new: true, runValidators: true },
  );

  if (!updateTask) {
    throw new ApiError(404, "Task not found");
  }

  await updateTask
    .populate("assignedTo", "fullname username ")
    .populate("assignedBy", "fullname username ");

  return res
    .status(200)
    .json(new ApiResponse(200, "Task updated successfully", updateTask));
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId, userId, project, status } = updateStatusSchema.parse({
    ...req.body,
    userId: req.user?._id,
    project: req.params?.projectId,
    taskId: req.params?.taskId,
  });

  const task = await Task.findOne({ _id: taskId, project });
  if (!task) {
    throw new ApiError(404, "Task not found in this project");
  }
  if (
    task.assignedTo.toString() !== userId &&
    req.projectMember.role !== UserRolesEnum.PROJECT_ADMIN
  ) {
    throw new ApiError(403, "You are not allowed to update this task status");
  }

  task.status = status;
  const updateTask = await task.save();
  await updateTask.populate("assignedTo", "fullname username ");
  await updateTask.populate("assignedBy", "fullname username ");
  return res
    .status(200)
    .json(new ApiResponse(200, "Task status updated successfully", updateTask));
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { taskId, projectId } = getTaskByIdSchema.parse({
    taskId: req.params?.taskId,
    projectId: req.params?.projectId,
  });

  const task = await Task.findOne({ _id: taskId, project: projectId });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  await task
    .populate("assignedTo", "fullname username ")
    .populate("assignedBy", "fullname username ");

  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetched successfully", task));
});

export const getAllTaskOfProject = asyncHandler(async (req, res) => {
  const { projectId } = getAllTasksOfProjectSchema.parse({
    projectId: req.params?.projectId,
  });

  const tasks = await Task.find({ project: projectId })
    .populate("assignedTo", "fullname username ")
    .populate("assignedBy", "fullname username ");
  if (tasks.length === 0) {
    throw new ApiError(404, "No tasks found for this project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Tasks fetched successfully", tasks));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId, projectId } = deleteTaskSchema.parse({
    taskId: req.params?.taskId,
    projectId: req.params?.projectId,
  });

  const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });

  if (!task) {
    throw new ApiError(404, "Task not found in this project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task successfully deleted", task));
});
