"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Eye, EyeOff, X } from "lucide-react"
import Cookies from "js-cookie"
import { storeUserData, type LoginResponse } from "@/lib/authentication"

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      reference_code: "",
    },
  })

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

              if (typeof window !== "undefined") {
                const storedUserData = localStorage.getItem("user_data")
                console.log("Stored user data:", storedUserData ? "User data stored" : "User data not found")
              }
            } catch (storageError) {
              console.error("Error storing user data:", storageError)

              // Fallback: Store manually if storeUserData fails
              try {
                Cookies.set("access_token", userData.access_token, { expires: 1 / 12 })
                Cookies.set("user_id", userData.user.id.toString(), { expires: 1 / 12 })
                if (typeof window !== "undefined") {
                  localStorage.setItem("user_data", JSON.stringify(userData.user))
                }
                console.log("Fallback storage completed")
              } catch (fallbackError) {
                console.error("Fallback storage also failed:", fallbackError)
              }
            }

            // Redirect to home page after successful signup
            setTimeout(() => {
              router.push("/")
            }, 1500) // Short delay to allow the success message to be seen

            return userData
          } else {
            throw new Error("Access token not received")
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Signup failed. Please try again.")
          throw err // Re-throw to show error in toast
        } finally {
          setIsLoading(false)
        }
      },
      {
        loading: "Creating your account...",
        success: () => "Account created successfully! Redirecting to home page...",
        error: (err) => `${err.message || "Failed to create account"}`,
      },
    )
  }

  return (
    <div className={cn("w-full max-w-md mx-auto bg-white rounded-lg p-6 relative mt-10", className)} {...props}>
      {/* Close button */}
      <Button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <X className="h-5 w-5" />
      </Button>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Welcome Back!</h1>
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
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
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
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10 h-12"
              {...register("password_confirmation", {
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
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference_code" className="text-sm font-medium text-gray-700">
            Promo Code
          </Label>
          <Input id="reference_code" placeholder="Enter Promo Code" className="h-12" {...register("reference_code")} />
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
