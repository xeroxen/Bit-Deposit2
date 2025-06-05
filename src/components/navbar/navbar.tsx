"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { MobileNav } from './sidenav';
import { useAuth } from '@/lib/authContext';

const Navbar = () => {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    
    // Check if we should hide login/signup buttons
    const shouldHideAuthButtons = isAuthenticated || pathname === '/login' || pathname === '/signup';
    
    return (
        <>
        <div className="fixed top-0 left-0 right-0 z-50 w-full h-[50px] bg-[#001529]">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-white"></div>
            
            {/* Main navbar content */}
            <div className="relative h-full flex items-center justify-between px-2">
                
                {/* Language Selector - Left side */}
                <div className="flex items-center bg-[#F3F6FA] rounded-[20px] px-3 py-1 h-8">
                    <div className="flex items-center space-x-2">
                        {/* US Flag placeholder */}
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 via-white to-blue-500 border border-gray-300 flex-shrink-0"></div>
                        <span className="text-xs font-medium text-black/88 whitespace-nowrap">US</span>
                    </div>
                    
                    {/* Dropdown arrow */}
                    <div className="ml-2 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-2" viewBox="0 0 14 8" fill="none">
                            <path d="M1 1L7 7L13 1" stroke="#48AC2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Logo/Brand - Center */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image src="/logo/logo.png" alt="logo" width={128} height={24} />
                </div>

                {/* Search Icon - Center Right */}
                <div className="absolute right-[38px] top-1/2 transform -translate-y-1/2">
                    <button className="w-6 h-6 border-[1.625px] border-[#276AA5] rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#276AA5" strokeWidth="1.5"/>
                            <path d="m13 13-3-3" stroke="#276AA5" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {/* Menu Button - Right side */}
                <MobileNav />
            </div>
        </div>
        
        {/* Login and Registration Buttons - Below Navbar (conditionally rendered) */}
        {!shouldHideAuthButtons && (
            <div className="fixed top-[50px] left-0 right-0 z-40 w-full h-[56px] bg-white">
                <div className="flex items-center justify-center h-full px-2 gap-2">
                    {/* Login Button */}
                    <button className="flex-1 h-[40px] bg-[#4094FF] rounded-[12px] flex items-center justify-center max-w-[calc(50%-4px)]">
                        <Link href="/login">
                            <span className="font-inter font-bold text-[12.8px] leading-[19px] text-white text-center">
                                Log In
                            </span>
                        </Link>
                    </button>
                    
                    {/* Registration Button */}
                    <button className="flex-1 h-[40px] bg-[#22C55E] rounded-[12px] flex items-center justify-center max-w-[calc(50%-4px)]">
                        <Link href="/signup">
                            <span className="font-inter font-bold text-[12.8px] leading-[19px] text-white text-center">
                                Registration
                            </span>
                        </Link>
                    </button>
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;