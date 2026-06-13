
import { useAuthStore } from "@/store/authStore";

import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuthStore();
    // const location = useLocation();

    if (isLoading) return <div><h1>Loading....</h1></div>;

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;


};