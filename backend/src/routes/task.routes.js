import { Router } from "express";
import {
  isProjectAdmin,
  isProjectMember,
} from "../middlewares/project.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTaskOfProject,
  getTaskById,
  updateTaskController,
  updateTaskStatus,
} from "../controllers/task.controllers.js";

const taskRouter = Router();

taskRouter
  .route("/create-task/:projectId")
  .post(isLoggedIn, isProjectAdmin, createTask);
taskRouter
  .route("/update-task/:projectId/:taskId")
  .patch(isLoggedIn, isProjectMember, updateTaskController);
taskRouter
  .route("/:projectId/tasks/:taskId/task-status")
  .patch(isLoggedIn, isProjectMember, updateTaskStatus);

taskRouter
  .route("/:projectId/tasks/:taskId/delete-task")
  .delete(isLoggedIn, isProjectAdmin, deleteTask);

taskRouter
  .route("/:projectId/tasks/:taskId/get-task")
  .get(isLoggedIn, isProjectMember, getTaskById);

taskRouter
  .route("/:projectId/tasks")
  .get(isLoggedIn, isProjectMember, getAllTaskOfProject);

export default taskRouter;
