"use client"

import { useState, useEffect } from "react"
import WithdrawForm from "./withdrawForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAuthToken } from "@/lib/authentication"

export default function WithdrawPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const token = getAuthToken()
    setIsAuthenticated(!!token)
    setIsLoading(false)

    // Listen for auth status changes
    const handleAuthChange = () => {
      const updatedToken = getAuthToken()
      setIsAuthenticated(!!updatedToken)
    }

    window.addEventListener('auth_status_changed', handleAuthChange)
    return () => {
      window.removeEventListener('auth_status_changed', handleAuthChange)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-10 mt-10">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh]">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-10 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
          Withdraw Funds
        </h1>
        
        <div className="w-full max-w-md flex flex-col items-center justify-center px-4 sm:px-0">
          {isAuthenticated ? (
              <WithdrawForm />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
              <h2 className="text-2xl font-semibold mb-4">Please Login First</h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to make a deposit. Please login or create an account.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
