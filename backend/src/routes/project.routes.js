import { Router } from "express";
import { createProject, getProjectById } from "../controllers/project.controllers.js";
import { isLogedIn } from "../middlewares/auth.middleware.js";

const projectRouter = Router()

projectRouter.route("/create-project").post(isLogedIn , createProject)
projectRouter.route("/get-project/:projectId").get(isLogedIn, getProjectById)

export default projectRouter