"use client"

import React, { useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import Cookies from "js-cookie"
import { storeUserData, type LoginResponse } from "@/lib/authentication"

export function SignupForm({ className, referer = "", ...props }: React.ComponentPropsWithoutRef<"div"> & { referer?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      reference_code: referer || "",
    },
  })

  // If referer changes, update the reference_code field
  useEffect(() => {
    if (referer) {
      setValue("reference_code", referer)
    }
  }, [referer, setValue])

  const onSubmit = async (data: {
    name: string
    email: string
    phone: string
    password: string
    password_confirmation: string
    reference_code: string
  }) => {
    setIsLoading(true)
    setError(null)

    // Extract username from email
    const username = data.email.split("@")[0]

    toast.promise(
      async () => {
        try {
          // Add the terms and agreement fields to the data
          const requestData = {
            ...data,
            cpf: null, // Pass CPF as null
            user_name: username, // Add the extracted username
            inviter_code: username + Math.floor(1000 + Math.random() * 9000).toString(),
            term_a: true,
            agreement: true,
          }

          // Use fetch directly for the registration since apiRequest expects authenticated requests
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Signup failed")
          }

          const userData: LoginResponse = await response.json()

          // Debug: Log the received data
          console.log("Signup response data:", userData)

          // Store user data using the proper API utility function
          if (userData.access_token && userData.user) {
            try {
              storeUserData(userData)
              console.log("User data stored successfully")

              // Verify storage worked
              const storedToken = Cookies.get("access_token")
              console.log("Stored token:", storedToken ? "Token stored" : "Token not found")

              // Redirect to home page or dashboard
              router.push("/")
            } catch (storageError) {
              console.error("Error storing user data:", storageError)
              throw new Error("Failed to store user data")
            }
          } else {
            throw new Error("Invalid response from server")
          }
        } catch (error) {
          console.error("Signup error:", error)
          setError(error instanceof Error ? error.message : "Signup failed")
          throw error
        } finally {
          setIsLoading(false)
        }
      },
      {
        loading: "Creating your account...",
        success: "Account created successfully!",
        error: (err) => err.message || "Failed to create account",
      }
    )
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Join Us Today</h1>
        <p className="text-sm text-gray-500">Enter your details below to create your account.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{error}</div>}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Your full name"
            className="h-12"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email address"
            className="h-12"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="Your phone number"
            className="h-12"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="pl-10 pr-10 h-12"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:bg-transparent"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
            Confirm Password<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10 h-12"
              {...register("password_confirmation", {
                required: "Password confirmation is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <Button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:bg-transparent"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference_code" className="text-sm font-medium text-gray-700">
            Referer Code
          </Label>
          <Input id="reference_code" placeholder="Enter Referer Code" className="h-12" {...register("reference_code")} />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "SIGN UP"}
        </Button>

        <div className="text-center text-sm text-gray-600 mt-4">
          By clicking sign up you&apos;ll agree to the{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>
        </div>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  )
}
