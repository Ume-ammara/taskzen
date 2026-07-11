
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { useAuthStore } from "./store/authStore";

import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import Task from "./components/task/Task";
import { ResendEmailVerification } from "./pages/ResendEmailVerification";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useEffect } from "react";



const App = () => {
  const { user, fetchUserProfile } = useAuthStore();

  useEffect(() => {
    const myFunc = async () => {
      const data = await fetchUserProfile()
      console.log('data', data)
    }
    myFunc()
  }, [fetchUserProfile])


  return (
    <div className="flex flex-col items-center justify-start">
      <Routes>
        <Route
          path="/auth/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route path="/auth/verify/:token" element={<VerifyEmail />} />
        <Route
          path="/auth/resend-email"
          element={<ResendEmailVerification />}
        />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={<Layout />}>
          <Route index element={<LandingPage />} />

        </Route>
        <Route path="/project/create-project" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route
          path="/auth/login"
          element={!user ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/create-task/:projectId/" element={<Task />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
