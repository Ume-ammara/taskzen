import { Router } from "express";
import {
  isProjectAdmin,
  isProjectMember,
} from "../middlewares/project.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  createTask,
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
  .route("/:projectId/task/:taskId/task-status")
  .patch(isLoggedIn,  isProjectMember, updateTaskStatus);

export default taskRouter;
