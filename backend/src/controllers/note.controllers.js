import { ProjectNote } from "../models/note.models.js";

import {
  createProjectNoteSchema,
  deleteProjectNoteSchema,
  getAllProjectNoteSchema,
  getProjectNoteByIdSchema,
  updateProjectNoteSchema,
} from "../schemas/note.schema.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createProjectNote = asyncHandler(async (req, res) => {
  const { project, createdBy, content } = createProjectNoteSchema.parse({
    ...req.body,
    project: req.params?.projectId,
    createdBy: req.user?._id,
  });

  const note = await ProjectNote.create({
    content,
    project,
    createdBy,
  });
  if (!note) {
    throw new ApiError(500, "Failed to create note");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "Note successfully created ", note));
});

export const updateProjectNote = asyncHandler(async (req, res) => {
  const { project, noteId, content } = updateProjectNoteSchema.parse({
    ...req.body,
    project: req.params?.projectId,
    noteId: req.params?.noteId,
  });
  const updateNote = await ProjectNote.findOneAndUpdate(
    { project, _id:noteId },
    { content },
    { new: true, runValidators: true },
  );

  if (!updateNote) {
    throw new ApiError(404, "Project note not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Project note successfully updated", updateNote),
    );
});

export const getProjectNoteById = asyncHandler(async (req, res) => {
  const { project, noteId } = getProjectNoteByIdSchema.parse({
    project: req.params?.projectId,
    noteId: req.params?.noteId,
  });

  const projectNote = await ProjectNote.findOne({ _id: noteId, project });
  if (!projectNote) {
    throw new ApiError(404, "Project note not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Project note fetched succesfully", projectNote),
    );
});

export const getAllProjectNote = asyncHandler(async (req, res) => {
  const { project } = getAllProjectNoteSchema.parse({
    project: req.params?.projectId,
  });

  const note= await ProjectNote.find({project})
  if(!note || note.length === 0){
    throw new ApiError(404, "No project notes found")
  }

  return res.status(200).json(new ApiResponse(200,"Project note fetched", note))

});

export const deleteProjectNote = asyncHandler(async (req, res) => {
  const { project, noteId } = deleteProjectNoteSchema.parse({
    project: req.params?.projectId,
    noteId: req.params?.noteId,
  });

const note = await ProjectNote.findOneAndDelete({_id:noteId, project})

if(!note){
    throw new ApiError(404, "Project note not found")
}

return res.status(200).json(new ApiResponse(200, "Project note successfully deleted", note))

});
