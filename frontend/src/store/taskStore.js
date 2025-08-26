import {create} from "zustand"
import { apiClient } from "@/api/axiosApi"

export const useTaskStore = create((set, get)=>({
    tasks : null,
    task : null,
    isLoading : false,
    error : null,
    

    fetchAllTasks: async(projectId)=>{
        try {
            set({isLoading : true, error: null})
            const res = await apiClient.get(`/task/${projectId}/tasks`)
            console.log("Task fetched successfully" , res.data.data?.tasks)
            set({
                tasks: res.data.data?.tasks,
                error: null
            })
        } catch (error) {
            console.error("could not fetch tasks", error)
            set({error : null})
        }finally{
            set({isLoading : false})
        }
    },

    createTask : async(projectId, taskData)=>{
       try {
         set({isLoading : true, error : null})
         const res = await apiClient.post(`/task/create-task/${projectId}`,taskData)
         console.log("Task created successfully", res.data?.data)
         set((state)=>({
             tasks: state.tasks ? [...state.tasks, res.data?.data] :[res.data?.data]
         }))
       } catch (error) {
        console.log("Task creation failed", error)
        set({
            error : null
        })
       }finally{
         set({isLoading : false})
       }
    }, 
    
}))