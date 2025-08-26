import { apiClient } from "@/api/axiosApi";
import { create } from "zustand";

export const useMemberStore = create((set, get)=>({
    members : null,
    member : null,
    isLoading : false,
    error: null,

    addMember : async(projectId, formData)=>{
    try {
            set({isLoading : true, error : null})
            const res = await apiClient.post(`/project/${projectId}/add-member`, formData)
            set((state)=>({
                members : state.members ? [...state.members, res.data.data?.member] :[res.data.data?.member]
            }))
        } catch (error) {
            console.error("Add member failed:", error);
            set({
                error :"Failed to add member" 
            })
        }finally{
            set({isLoading : false})
        }
},

fetchAllMembers : async (projectId)=>{
  try {
    set({isLoading : true, error : null})
    const res = await apiClient.get(`/project/${projectId}/members`)
    console.log("fetch all members successfully", res.data.data.members)
    set({
        members : res.data.data?.members, 
        error : null
    })
  } catch (error) {
    console.error("Could not fetch project members", error)
    set({
        error : "Could not fetch project members"
    })
  }finally{
    set({isLoading : false})
  }
}

}))