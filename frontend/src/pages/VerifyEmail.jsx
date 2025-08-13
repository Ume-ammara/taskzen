import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, XCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const { verifyEmail, isLoading, error } = useAuthStore();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);
  if (isLoading)
    return (
      <>
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-gray-600 max-w-sm">
          We’re verifying your email address. Please wait a moment...
        </p>
      </>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen  px-4">
        <Card className="max-w-md w-full shadow-lg rounded-2xl border">
          <CardContent className="flex flex-col items-center gap-4 py-10" >
           <XCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-600 font-medium text-lg">Verification failed!</p>
        <p className="text-gray-600 font-bold max-w-sm text-center">
          The verification link might be expired or invalid. Please try
          requesting a new one.
        </p>
        <Link to="/auth/resend-email">
          <Button className="mt-3">Resend Verification Email</Button>
        </Link>
          </CardContent>
        </Card>
       </div>
      
    );

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <Card className="max-w-md w-full shadow-lg rounded-2xl border">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <CheckCircle className="w-12 h-12 text-green-500" />
          <p className="text-green-600 font-semibold text-lg">
            Your email has been verified successfully!
          </p>
          <p className="text-gray-600 max-w-sm">
            You can now log in and start exploring all the features.
          </p>
          <Link to="/auth/login">
            <Button className="mt-3">Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;





 
      