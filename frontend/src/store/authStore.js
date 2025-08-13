import { apiClient } from "@/api/axiosApi";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isVerified: false,

  startLoading: () => set({ isLoading: true, error: null }),
  stopLoading: () => set({ isLoading: false }),
  setError: (msg) => set({ error: msg }),


  loginUser: async (formData) => {
    try {
      get().startLoading();
      const res = await apiClient.post("/auth/login", formData);
      set({
        user: res.data?.data?.user ?? null,
        isAuthenticated: true,
      });
      console.log("backend data3:", res.data?.data?.user);
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Login failed";
      get().setError(msg);
      set({ user: null, isAuthenticated: false });
    } finally {
      get().stopLoading();
    }
  },

  signupUser: async (formData) => {
    try {
      get().startLoading();
      const res = await apiClient.post("/auth/register", formData);
      set({
        user: res.data?.message?.user,
        isAuthenticated: true,
      });
      console.log("User registerd sucessfully", res.data?.message?.user);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Registration failed";
      get().setError(msg);
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      get().stopLoading();
    }
  },

  verifyEmail: async (token) => {
    try {
      get().startLoading();
      const res = await apiClient.get(`/auth/verify-email/${token}`);
      console.log("verify email", res);
      set({
        error: null,
      });
      console.log("verify email user" ,res.data?.data?.messages )
    } catch (error) {
     
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Email verification failed";
      set({
        error: msg,
      });
      console.log("verify email error", error)
       get().setError(msg);
    } finally {
      get().stopLoading();
    }
  },

  resendEmailVerification: async(email) =>{
    try {
      get().startLoading()
      const res = await apiClient.post("/auth/resend-email", {email})
      
      console.log("Verification email sent:", res.data.message)
      set({
        error : null
      })
    } catch (error) {
      console.log("Failed to resend email verification" ,error)
      const msg =
        error.response?.data?.message ||
        error?.message ||
        "Unable to resend verification email";
        get().setError(msg);
    }finally{
      get().stopLoading();
    }
    
  }

}));
