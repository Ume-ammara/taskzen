import { apiClient } from "@/api/axiosApi";
import { create } from "zustand";

export const useProjectStore = create((set, get) => ({
  project: null,
  projects: null,
  member: null,
  members: null,
  isLoading: false,
  error: null,
 

  startLoading: () => set({ isLoading: true, error: null }),
  stopLoading: () => set({ isLoading: false }),
  setError: (msg) => set({ error: msg }),

  createProject: async (formData) => {
    try {
      get().startLoading();
      const res = await apiClient.post("/project/create-project", formData);
      console.log("create project ", res.data)
      // set((state) => ({
      //   projects: state.projects
      //     ? [...state.projects, res.data?.data?.project]
      //     : [res.data?.data?.project],
      //   project: res.data?.data?.project,
        
        
      // }));
      // return res.data?.data?.project;
    } catch (error) {
     
      const errResponse = error.response?.data;
      const msg =
        errResponse?.error?.length > 0
          ? errResponse.error
          : [
              errResponse?.message ||
                error?.message ||
                "Failed to create project",
            ];

      console.log("Failed to create project", error);
      set({ error: msg });
    }finally{
      get().stopLoading()
    }
  },

  
}));
