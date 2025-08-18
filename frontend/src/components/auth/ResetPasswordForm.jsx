
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { useAuthStore } from "@/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "@/schemas/authScema";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {resetPassword} = useAuthStore()
  const {token} = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });


  const onSubmit = async (data) => {
  try {
    await resetPassword(token, data);
    toast.success("Password reset successfully!");
    navigate("/auth/login");
  } catch (error) {
    toast.error("Failed to reset password");
  }
};

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create New Password
      </h1>
      <p className=" mb-6 text-center">
        Your new password must be different from any of your previous passwords
      </p>
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >

       <div className="relative grid gap-3">
          <Label htmlFor = "password">New Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            {...register("newPassword")}
          />
          <button
            type="button"
            className="absolute  inset-y-0 top-1/2 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
         {/* Confirm password */}

        <div className="relative grid gap-3">
          <Label htmlFor = "password">Confirm Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="absolute  inset-y-0 top-1/2 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Reset Password Button */}
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
     </form>
     
    </div>
  );
};

export default ResetPasswordForm;



