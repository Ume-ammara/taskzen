import { Router } from "express";
import {
  addMemberController,
  createProject,
  deleteProject,
  getAllProjectMembers,
  getAllProjects,
  getProjectById,
  removeProjectMember,
  roleUpdate,
  updateProject,
} from "../controllers/project.controllers.js";

import { isProjectAdmin, isProjectMember } from "../middlewares/project.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

projectRouter.route("/create-project").post(isLoggedIn, createProject);
projectRouter.route("/get-project/:projectId").get(isLoggedIn, getProjectById);
projectRouter.route("/get-all-project").get(isLoggedIn, getAllProjects);
projectRouter
  .route("/update-project/:projectId")
  .post(isLoggedIn, isProjectAdmin, updateProject);
projectRouter
  .route("/:projectId/add-member")
  .post(isLoggedIn, isProjectAdmin, addMemberController);
projectRouter.route("/:projectId/members").get(isLoggedIn, isProjectMember, getAllProjectMembers)
projectRouter
  .route("/:projectId/members/:memberId")
  .patch(isLoggedIn, isProjectAdmin, roleUpdate);

projectRouter.route("/:projectId/members").delete(isLoggedIn, isProjectAdmin, removeProjectMember)

projectRouter
  .route("/:projectId")
  .delete(isLoggedIn, isProjectAdmin, deleteProject);


export default projectRouter;
