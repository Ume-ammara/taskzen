import { ProjectMember } from "../models/projectmember.models.js"
import { ApiError } from "../utils/api-error.js"
import {asyncHandler} from "../utils/async-handler.js"
import { UserRolesEnum } from "../utils/constants.js"

export const isProjectAdmin = asyncHandler(async(req , res, next)=>{
   const projectId = req.params?.projectId
   const userId = req.user?._id
   console.log(projectId, "user Id", userId)
   const projectMember = await ProjectMember.findOne({user : userId, project: projectId})
   console.log("Project member", projectMember)
   if(!projectMember){
    throw new ApiError(404, "Not found")
   }
   if(projectMember.role !== UserRolesEnum.PROJECT_ADMIN){
    throw new ApiError(401, "Access denied, Project admin only")
   }
   req.projectMember = projectMember;
   next()
})

export const isProjectMember = asyncHandler(async(req, res , next)=>{
    const projectId = req.params?.projectId
    const userId = req.user?._id
    const projectMember = await ProjectMember.findOne({user : userId, project: projectId})
    if(!projectMember){
    throw new ApiError(404, "Not found")
   }
    if(projectMember.role !== UserRolesEnum.PROJECT_ADMIN && projectMember.role !== UserRolesEnum.MEMBER){
    throw new ApiError(401, "Access denied, Project admin only")
   }
   req.projectMember = projectMember; 
   next()
})

