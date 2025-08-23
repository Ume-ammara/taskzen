import {create} from "zustand"
import { apiClient } from "@/api/axiosApi"

export const taskStore = create((set, get)=>({
    tasks : null,
    task : null,
    isLoading : false,
    error : null,
    

    fetchAllTasks: async(projectId)=>{
        try {
            set({isLoading : true, error: null})
            const res = await apiClient.get(`/task/${projectId}/tasks`)
            set({
                tasks: res.data.data
            })
        } catch (error) {
            console.error("could not fetch tasks", error)
            set({error : null})
        }finally{
            set({isLoading : false})
        }
    },

    createTask : async(projectId)=>{
       try {
         set({isLoading : true, error : null})
         const res = await apiClient.post(`/create-task/${projectId}`)
         console.log("Task created successfully", res.data?.data)
         set({
             tasks: [...get().tasks, res.data?.data]
         })
       } catch (error) {
        console.log("Task creation failed", error)
        set({
            error : null
        })
       }finally{
         set({isLoading : false})
       }
    }
}))