import React, { useEffect } from "react";
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

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/verify",
  "/auth/forgot-password",
  "/auth/reset",
  "/auth/resend-email",
];

const App = () => {
  const { user, fetchUserProfile, isLoading } = useAuthStore();

  useEffect(() => {
    const isAuthPage = AUTH_ROUTES.some((route) =>
      window.location.pathname.startsWith(route)
    );

    if (!isAuthPage) {
      fetchUserProfile();
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        <Route path="/project/create-project" element={user ? <Dashboard /> : <Navigate to={"/auth/login"} />} />

        <Route
          path="/auth/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/create-task/:projectId/" element={<Task />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
