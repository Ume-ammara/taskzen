import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';

import { registerUserSchema } from '@/schemas/authScema';
import { useAuthStore } from '@/store/authStore';
import { useForm } from 'react-hook-form';


const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {signupUser} = useAuthStore()
  const [userSignup, setUserSignup] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema)
  });

  const onSubmit = async(data) => {
    console.log("Form Data:", data);
    try {
      setUserSignup(false)
      await signupUser(data)
      setUserSignup(true)
    } catch (error) {
      setUserSignup(false)
      console.log("Signup error", error)
    }
  };

  if(userSignup){
    return(
      <div className='flex  flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold '>Signup successful!</h1>
        <p className='text-gray-600 mt-2'>Please check your email to verify your account.</p>
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </div>
    )
  }

  return (
    <div >
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className='grid gap-3'>
          <Label htmlFor = "fullname">Full Name</Label>
          <Input
            type="text"
            placeholder="Full Name"
            {...register("fullname")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Username */}

         <div className='grid gap-3'>
          <Label htmlFor = "username">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className='grid gap-3'>
          <Label htmlFor = "email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative grid gap-3">
          <Label htmlFor = "password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute  inset-y-0 top-1/2 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      {/* Link to login */}
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
