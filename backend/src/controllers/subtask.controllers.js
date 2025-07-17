import { SubTask } from "../models/subtask.models.js";
import { Task } from "../models/task.models.js";
import {
  createSubTaskSchema,
  getSubTaskByIdSchema,
  updateSubTaskSchema,
} from "../schemas/subtask.schema.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createSubTask = asyncHandler(async (req, res) => {
  const { title, taskId, projectId, userId, isCompleted } =
    createSubTaskSchema.parse({
      ...req.body,
      userId: req.user?._id,
      projectId: req.params?.projectId,
      taskId: req.params?.taskId,
    });

  const task = await Task.findOne({ _id: taskId, project: projectId });
  if (!task) {
    throw new ApiError(404, "Task not found in this project");
  }

  const subTask = await SubTask.create({
    title,
    isCompleted,
    task: taskId,
    createdBy:userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Sub-task created successfully", subTask));
});

export const updateSubTask = asyncHandler(async (req, res) => {
  const { title, taskId, userId, projectId, subTaskId, isCompleted } =
    updateSubTaskSchema.parse({
      ...req.body,
      userId: req.user?._id,
      projectId: req.params?.projectId,
      taskId: req.params?.taskId,
      subTaskId: req.params?.subTaskId,
    });

  const subTask = await SubTask.findOneAndUpdate(
     { _id: subTaskId, task:taskId  },
  { title, isCompleted  },
  { new: true, runValidators: true }
  );

  if(!subTask){
    throw new ApiError(404, "Sub-task not found")
  }
 
   
  return res.status(200).json(new ApiResponse(200, "Sub-task updated successfully", subTask))

});

export const getSubTaskById = asyncHandler(async (req, res) => {
  const {subTaskId, projectId, taskId} = getSubTaskByIdSchema.parse({
    subTaskId: req.params?.subTaskId,
    taskId: req.params?.taskId,
    projectId: req.params?.projectId
  })

  const subTask = await SubTask.findOne({_id :subTaskId, task:taskId})

  if(!subTask){
    throw new ApiError(404, "Sub-task not found")
  }

 return res.status(200).json(new ApiResponse(200, "Sub-task fetched successfully", subTask))

});

export const deleteSubTask = asyncHandler(async (req, res) => {
  const {subTaskId, projectId, taskId} = getSubTaskByIdSchema.parse({
    subTaskId: req.params?.subTaskId,
    taskId: req.params?.taskId,
    projectId: req.params?.projectId
  })

  const subTask = await SubTask.findOneAndDelete({_id: subTaskId, task:taskId})

  if(!subTask){
    throw new ApiError(404, "Sub-task not found")
  }

 return res.status(200).json(new ApiResponse(200, "Sub-task successfully deletetd", subTask))
});
