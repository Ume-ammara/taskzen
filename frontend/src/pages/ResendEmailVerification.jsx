import { resendEmailSchema } from '@/schemas/authScema'
import { useAuthStore } from '@/store/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'


const ResendEmailVerification = () => {
    const {resendEmailVerification, isLoading} = useAuthStore()
    const [successMsg , setSuccessMsg] = useState(null)
    const [errorMsg , setErrorMsg] = useState(null)
    

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(resendEmailSchema)
  })

  const onSubmit = async(formData)=>{
  try {
      setSuccessMsg(null)
      setErrorMsg(null)
      const res = await resendEmailVerification(formData.email)
      setSuccessMsg(res || "Verification email sent.")
  } catch (error) {
    const msg =
        error.response?.data?.message ||
        error?.message ||
        "Unable to resend verification email";
    setErrorMsg(msg)
  }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Resend Email Verification</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Sending..." : "Resend Email"}
        </button>
      </form>
    </div>
  )
}

export default ResendEmailVerification

