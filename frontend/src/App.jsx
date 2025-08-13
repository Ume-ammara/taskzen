import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuthStore } from "./store/authStore";
import ResendEmailVerification from "./pages/resendEmailVerification";

const App = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-start">
      <Routes>

        <Route
          path="/auth/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route path="/auth/verify/:token" element=  {<VerifyEmail />} />
        <Route path="/auth/resend-email" element={ <ResendEmailVerification /> } />
        <Route
          path="/"
          element={user ? <LandingPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/auth/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        
      </Routes>
    </div>
  );
};

export default App;
