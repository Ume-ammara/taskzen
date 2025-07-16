import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  isProjectAdmin,
  isProjectMember,
} from "../middlewares/project.middleware.js";
import {
  createSubTask,
  deleteSubTask,
  getSubTaskById,
  updateSubTask,
} from "../controllers/subtask.controllers.js";

const subtaskRouter = Router();

subtaskRouter
  .route("/:projectId/tasks/:taskId/subtasks")
  .post(isLoggedIn, isProjectMember, createSubTask);

subtaskRouter
  .route("/:projectId/tasks/:taskId/subtasks/:subTaskId")
  .patch(isLoggedIn, isProjectMember, updateSubTask);

subtaskRouter
  .route("/:projectId/tasks/:taskId/subtasks/:subTaskId")
  .get(isLoggedIn, isProjectMember, getSubTaskById);

subtaskRouter
  .route("/:projectId/tasks/:taskId/subtasks/:subTaskId")
  .delete(isLoggedIn, isProjectMember, deleteSubTask);

export default subtaskRouter;
