"use client"

import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Data } from "@/types/data.types"

export default function LoginPage() {
  const [logo, setLogo] = useState<Data>()

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/data`)
        const data = await response.json()
        setLogo(data.setting)
      } catch (error) {
        console.error('Error fetching logo:', error)
      }
    }
    fetchLogo()
  }, [])

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left side - Banners and branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
        
        {/* Banner carousel */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/banner/1.png"
              alt="Gaming Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Logo overlay */}
          <div className="absolute top-8 left-8 z-20">
            {logo?.software_logo_white ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${logo.software_logo_white}`}
                alt="Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            ) : (
              <div className="w-30 h-10 bg-white/20 backdrop-blur-sm rounded-lg animate-pulse"></div>
            )}
          </div>
          
          {/* Welcome text overlay */}
          <div className="absolute bottom-20 left-8 right-8 z-20 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg opacity-90">Your trusted platform for secure gaming and transactions</p>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 right-8 z-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Image
                src="/images/rocket-logo.png"
                alt="Rocket"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-12 z-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Image
                src="/images/anime4.gif"
                alt="Anime"
                width={50}
                height={50}
                className="object-contain rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            {logo?.software_logo_white ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${logo.software_logo_white}`}
                alt="Logo"
                width={140}
                height={50}
                className="mx-auto object-contain"
              />
            ) : (
              <div className="w-36 h-12 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
            )}
          </div>
          
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
