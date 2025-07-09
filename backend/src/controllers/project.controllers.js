import { Project } from "../models/project.models";
import { createProjectSchema } from "../schemas/project.schema";
import { asyncHandler } from "../utils/async-handler";
import { ApiResponse,  } from "../utils/api-response";
import { ApiError } from "../utils/api-error";

export const createProject = asyncHandler(async(req, res)=>{
    const {name , description} = createProjectSchema.parse(req.body)
    const createdId = req.user._id
    const existingProject = await Project.findOne({name})
    if(existingProject){
       throw new ApiError(409, "Project with this name already exists")
    }
    const project = await Project.create({name, description, createdBy: createdId})

    return res.status(200).json(
        new ApiResponse(200, "Project created successfully",{
            project
        })
    )
})