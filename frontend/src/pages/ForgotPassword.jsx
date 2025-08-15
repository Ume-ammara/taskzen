import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema } from '@/schemas/authScema';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const {forgotPassword, isLoading, error} = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
      });

    const onSubmit = async(formData)=>{
      console.log("forgot passwod page:" ,forgotPassword(formData))
    }
      
  return (
   <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
     <h1 className="text-2xl font-bold mb-6 text-center">
        Create New Password
      </h1>
      <p className=" mb-6 text-center">
        Please provide your registered email address. We will send a password reset link to your inbox.
      </p>

   {/* email */}

   <form onSubmit={handleSubmit(onSubmit)}>

      {/* email */}
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
        <Button type="submit" className="w-full mt-5">
          Send Email
        </Button>
   </form>
     {/* Link to login */}
      <p className="mt-4 text-center text-sm">
        Remeber Password ?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
   </div>
  )
}

export default ForgotPassword
