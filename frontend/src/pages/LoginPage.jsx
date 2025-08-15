import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginUserSchema } from "../schemas/authScema";
import { useAuthStore } from "@/store/authStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginUserSchema),
  });

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    try {
      await loginUser(data);
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <div className="text-2xl font-bold mb-6 text-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="Email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="h-12 text-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative grid gap-3">
            <Label htmlFor="Password">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="h-12 text-lg pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 top-1/2 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Forgot password link  */}

            <div className="text-left">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 text-lg">
            Login
          </Button>
        </form>

        {/* Link to Sign Up */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
