"use client";

import { SignupForm } from "@/components/auth/signup-form";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Data } from "@/types/data.types";

export default function SignupPageClient() {
  const searchParams = useSearchParams();
  const referer = searchParams.get("referer") || "";
  const [logo, setLogo] = useState<Data>();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/data`);
        const data = await response.json();
        setLogo(data.setting);
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    fetchLogo();
  }, []);

  return (
    <div className="flex min-h-screen mt-30">
      {/* Left side - Banners and branding */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 z-10"></div>
        
        {/* Banner carousel */}
        <div className="relative w-full h-full mt-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/banner/2.png"
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
            <h1 className="text-4xl font-bold mb-4">Join Us Today</h1>
            <p className="text-lg opacity-90">Create your account and start your gaming journey with Bit-Deposit</p>
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-white">
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
          
          <SignupForm referer={referer} />
        </div>
      </div>
    </div>
  );
} 