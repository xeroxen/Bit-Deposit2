"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CheckCircle, AlertCircle, LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>

// Main component wrapper with Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordForm />
    </Suspense>
  )
}

// Fallback component when the form is loading
function ResetPasswordFallback() {
  return (
    <div className="grid min-h-screen place-items-center px-4 py-12 md:px-6">
      <div className="w-full max-w-[400px] flex flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <LockKeyhole className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex items-center justify-center min-h-[300px]">
            <p className="text-muted-foreground">Loading form...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Component that uses useSearchParams
function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [token, setToken] = useState<string>("")

  // Extract token from the URL query parameter
  useEffect(() => {
    // Get the token from the query parameter
    const urlToken = searchParams.get("token")
    if (urlToken) {
      setToken(urlToken)
      console.log("token",urlToken)
    }
  }, [searchParams])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: FormValues) {
    if (!token) {
      setStatus({
        type: "error",
        message: "Reset token is missing. Please request a new password reset link.",
      })
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
      // Call the API with the token in the URL and data in the body
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Your password has been reset successfully!",
        })
        form.reset()
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setStatus({
          type: "error",
          message: result.message || "Failed to reset password. Please try again.",
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later. " + error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 py-12 md:px-6">
      <div className="w-full max-w-[400px] flex flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <LockKeyhole className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and create a new password for your account.
          </p>
          {token && <p className="text-xs text-muted-foreground">Token: {token.substring(0, 10)}...</p>}
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {status && (
                  <Alert variant={status.type === "success" ? "default" : "destructive"}>
                    {status.type === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{status.message}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}