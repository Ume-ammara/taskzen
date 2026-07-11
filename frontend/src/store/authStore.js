import { apiClient } from "@/api/axiosApi";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  startLoading: () => set({ isLoading: true, error: null }),
  stopLoading: () => set({ isLoading: false }),
  setError: (msg) => set({ error: msg }),

  loginUser: async (formData) => {
    try {
      get().startLoading();
      const res = await apiClient.post("/auth/login", formData, {});
      set({
        user: res.data?.data?.user ?? null,
      });
      console.log("backend data3:", res.data?.data?.user);
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Login failed";
      get().setError(msg);
      set({ user: null });
    } finally {
      get().stopLoading();
    }
  },

  signupUser: async (formData) => {
    try {
      get().startLoading();
      await apiClient.post("/auth/register", formData);
      set({ error: null });
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Registration failed";
      get().setError(msg);
      set({
        user: null,
      });
    } finally {
      get().stopLoading();
    }
  },

  verifyEmail: async (token) => {
    try {
      set({
        error: null,
      });
      get().startLoading();
      const res = await apiClient.get(`/auth/verify-email/${token}`);
      console.log("verify email", res);

      console.log("verify email user", res.data?.data?.messages);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Email verification failed";
      console.log("verify email error", error);
      get().setError(msg);
    } finally {
      get().stopLoading();
    }
  },

  resendEmailVerification: async (email) => {
    try {
      get().startLoading();
      const res = await apiClient.post("/auth/resend-email", { email });

      console.log("Verification email sent:", res.data.message);
      set({
        error: null,
      });
    } catch (error) {
      console.log("Failed to resend email verification", error);
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Unable to resend verification email";
      get().setError(msg);
    } finally {
      get().stopLoading();
    }
  },

  forgotPassword: async (email) => {
    try {
      get().startLoading();
      const res = await apiClient.post("/auth/forgot-password", email);
      console.log("Forgot password request successful", res.data?.message);
      set({
        error: null,
      });
    } catch (error) {
      console.error("Forgot password request failed", error);
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Unable to process forgot password request";
      get().setError(msg);
    } finally {
      get().stopLoading();
    }
  },

  resetPassword: async (token, data) => {
    try {
      get().startLoading();
      const res = await apiClient.post(`/auth/reset-password/${token}`, data);
      console.log("Password reset successful", res.data?.message);
      set({
        error: null,
      });
      return res.data?.data;
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Unable to reset your password";
      get().setError(msg);
    } finally {
      get().stopLoading();
    }
  },

  fetchUserProfile: async () => {
     console.log("fetchUserProfile called");
    try {
      get().startLoading();
      const res = await apiClient.get("/auth/profile");
      set({
        user: res.data?.data?.user ?? null,
      });
      console.log("User profile fetched successfully", res.data?.data?.user);
    } catch (error) {
      if (error.response?.status !== 401) {
        const msg =
          error.response?.data?.message ||
          error?.message ||
          "Failed to fetch user profile";
        get().setError(msg);
      }
      set({ user: null });
    } finally {
      get().stopLoading();
    }
  },

  logoutUser :async()=>{
    try {
        get().startLoading();
      await apiClient.get("/auth/logout")
      set({user:null})
    } catch (error) {
      console.error("Logout request failed", error);
      
        error.response?.data?.message ||
        error?.message ||
        "Unable to process logout request";
      get().setError(msg);
    } finally {
      get().stopLoading();
    }
    
  }
}));
