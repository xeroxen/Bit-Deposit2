"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, User, Phone, X } from "lucide-react"
import { storeUserData, type LoginResponse } from "@/lib/authentication"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      const loginData: LoginResponse = await response.json()

      // Store user data and access token using the new API function
      if (loginData.access_token) {
        storeUserData(loginData)

        // Redirect to home page
        router.push("/")
      } else {
        throw new Error("Access token not received")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("w-full max-w-md mx-auto bg-white rounded-lg p-6 relative", className)} {...props}>
      {/* Close button */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <X className="h-5 w-5" />
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{error}</div>}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email or Account ID
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter Email or Account ID"
              className="pl-10 pr-10 h-12 border-gray-200"
              {...register("email", { required: "Email is required" })}
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10 h-12 border-gray-200"
              {...register("password", { required: "Password is required" })}
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)} />
            <Label htmlFor="remember" className="text-sm text-gray-700">
              Remember me
            </Label>
          </div>
          <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "LOGIN"}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up for free
          </Link>
        </div>
      </form>
    </div>
  )
}
