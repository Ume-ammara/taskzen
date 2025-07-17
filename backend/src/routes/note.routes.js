import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  isProjectAdmin,
  isProjectMember,
} from "../middlewares/project.middleware.js";
import {
  createProjectNote,
  deleteProjectNote,
  getAllProjectNote,
  getProjectNoteById,
  updateProjectNote,
} from "../controllers/note.controllers.js";
const projectNoteRouter = Router();

projectNoteRouter
  .route("/:projectId/note")
  .post(isLoggedIn, isProjectMember, createProjectNote);
projectNoteRouter
  .route("/:projectId/note/:noteId")
  .patch(isLoggedIn, isProjectMember, updateProjectNote);
projectNoteRouter
  .route("/:projectId/note/:noteId")
  .get(isLoggedIn, isProjectMember, getProjectNoteById);

projectNoteRouter
  .route("/:projectId/note")
  .get(isLoggedIn, isProjectMember, getAllProjectNote);  

  
projectNoteRouter
  .route("/:projectId/note/:noteId")
  .delete(isLoggedIn, isProjectMember, deleteProjectNote);

export default projectNoteRouter;
