import { create } from "zustand";
import { apiClient } from "@/api/axiosApi";

export const useTaskStore = create((set, get) => ({
  tasks: null,
  task: null,
  isLoading: false,
  error: null,

  fetchAllTasks: async (projectId) => {
    try {
      set({ isLoading: true, error: null });
      const res = await apiClient.get(`/task/${projectId}/tasks`);
      console.log("Task fetched successfully", res.data.data);
      set({
        tasks: res.data.data,
        error: null,
      });
    } catch (error) {
      console.error("could not fetch tasks", error);
      set({ error: null });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTaskStatus: async (projectId, status, taskId) => {
    try {
      set({ isLoading: true, error: null });
      const res = await apiClient.patch(`/task/${projectId}/tasks/${taskId}`, {
        status,
      });
      const updateStatus = res.data.data;
      console.log("Task status updated successfully", updateStatus);
      set({
        tasks: get().tasks.map((task) =>
          task._id == taskId ? updateStatus : task
        ),
      });
    } catch (error) {
      console.log("Task status updation failed", error);
      set({ error: "Task status updation failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  createTask: async (projectId, taskData) => {
    try {
      set({ isLoading: true, error: null });

      const res = await apiClient.post(
        `/task/create-task/${projectId}`,
        taskData
      );
      console.log("Task created successfully", res.data?.data);
      set((state) => ({
        tasks: state.tasks
          ? [...state.tasks, res.data?.data]
          : [res.data?.data],
      }));
    } catch (error) {
      console.log("Task creation failed", error);
      set({
        error: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
