"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { MobileNav } from './sidenav';
import { useAuth } from '@/lib/authContext';
import { WalletBalance } from '@/components/ui/wallet-balance';
import { Home, BarChart2, Gamepad2, Plus } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();
    const { isAuthenticated, loading } = useAuth();
    
    // Only hide auth buttons when explicitly on login/signup pages
    // Don't use isAuthenticated here to prevent flashing
    const hideAuthButtonsOnRoutes = pathname === '/login' || pathname === '/signup';
    
    // Navigation items with Lucide icons
    const navItems = useMemo(() => [
        { name: 'Top', icon: Home, href: '/' },
        { name: 'Cricket', icon: BarChart2, href: '/cricket' },
        { name: 'Casino', icon: Gamepad2, href: '/casino' },
    ], []);
    
    return (
        <>
        <div className="fixed top-0 left-0 right-0 z-50 w-full h-[50px] bg-[#001529]">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-white"></div>
            
            {/* Main navbar content */}
            <div className="relative h-full flex items-center justify-between px-2">
                
                {/* Language Selector or Wallet Balance - Left side */}
                {!loading && isAuthenticated ? (
                    <div className="flex items-center bg-[#F3F6FA] rounded-[20px] px-3 py-1 h-8">
                        <WalletBalance showArrow={false} size="sm" className="whitespace-nowrap" />
                        <Link href="/deposit" className="ml-1">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <Plus className="text-white w-3 h-3" />
                            </div>
                        </Link>
                    </div>
                ) : (
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
                )}

                {/* Logo/Brand - Center */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Link href="/">
                        <Image src="/logo/logo.png" alt="logo" width={128} height={24} className="cursor-pointer" />
                    </Link>
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
        
        {/* Login and Registration Buttons - Below Navbar */}
        {/* Only show when not loading AND not authenticated AND not on auth pages */}
        {!loading && !isAuthenticated && !hideAuthButtonsOnRoutes && (
            <div className="fixed top-[50px] left-0 right-0 z-40 w-full h-[56px] bg-white">
                <div className="flex items-center justify-center h-full px-4 gap-4">
                    {/* Login Button */}
                    <Link href="/login" className="w-full max-w-[170px]">
                        <div className="w-full h-[40px] bg-[#4094FF] rounded-[25px] flex items-center justify-center">
                            <span className="font-inter font-bold text-sm text-white">
                                Log In
                            </span>
                        </div>
                    </Link>
                    
                    {/* Registration Button */}
                    <Link href="/signup" className="w-full max-w-[170px]">
                        <div className="w-full h-[40px] bg-[#22C55E] rounded-[25px] flex items-center justify-center">
                            <span className="font-inter font-bold text-sm text-white">
                                Registration
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        )}

        {/* Navigation Tabs - Only show when not loading AND authenticated */}
        {!loading && isAuthenticated && (
            <div className="fixed top-[50px] left-0 right-0 z-40 w-full h-[56px] bg-white border-b border-gray-200">
                <div className="flex items-center justify-between h-full px-2">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        const IconComponent = item.icon;
                        return (
                            <Link href={item.href} key={index} className="flex-1">
                                <div className={`flex flex-col items-center justify-center h-full ${isActive ? 'border-b-2 border-blue-500' : ''}`}>
                                    <div className="w-6 h-6 mb-1 flex items-center justify-center">
                                        <IconComponent 
                                            size={20} 
                                            className={`${isActive ? 'text-blue-500' : 'text-gray-500'}`} 
                                        />
                                    </div>
                                    <span className={`text-xs font-medium ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;