import { Router } from "express";
import { createProject } from "../controllers/project.controllers.js";
import { isLogedIn } from "../middlewares/auth.middleware.js";

const projectRouter = Router()

projectRouter.route("/create-project").post(isLogedIn , createProject)

export default projectRouter