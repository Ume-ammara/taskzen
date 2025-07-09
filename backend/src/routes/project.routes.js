import { Router } from "express";
import { createProject } from "../controllers/project.controllers";
import { isLogedIn } from "../middlewares/auth.middleware";

const router = Router()

router.route("/create-project").post(isLogedIn , createProject)

export default router