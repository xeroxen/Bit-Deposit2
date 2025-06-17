"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SideNav } from './sidenav';
import { useAuth } from '@/lib/authContext';
import { WalletBalance } from '@/components/ui/wallet-balance';
import { Button } from "@/components/ui/button";
import { Home, BarChart2, Gamepad2, Plus, ChevronDown, Globe, Menu } from 'lucide-react';
import { Data } from '@/types/data.types';

interface NavbarProps {
  onSidebarToggle?: () => void;
}

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
    const [logo, setLogo] = useState<Data>();
    const pathname = usePathname();
    const { isAuthenticated, loading } = useAuth();
    
    // Only hide auth buttons when explicitly on login/signup pages
    const hideAuthButtonsOnRoutes = pathname === '/login' || pathname === '/signup';
    
    // Navigation items with Lucide icons for mobile
    const mobileNavItems = useMemo(() => [
        { name: 'Top', icon: Home, href: '/' },
        { name: 'Sports', icon: BarChart2, href: '/sports' },
        { name: 'Casino', icon: Gamepad2, href: '/casino' },
    ], []);
    
    // Desktop navigation items
    const desktopNavItems = useMemo(() => [
        { name: 'Top', icon: Home, href: '/' },
        { name: 'Sports', icon: BarChart2, href: '/sports' },
        { name: 'Casino', icon: Gamepad2, href: '/casino' },
    ], []);
    
    useEffect(() => {
        const fetchLogo = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/data`);
            const data = await response.json();
            setLogo(data.setting);
        };
        fetchLogo();
    }, []);


    return (
        <>
        {/* Desktop Navbar */}
        <div className="hidden md:block fixed top-0 left-0 right-0 z-50 w-full">
            <header className="bg-[#1d3d68] border-b border-[#275ea5] px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        {onSidebarToggle && (
                            <button 
                                onClick={onSidebarToggle} 
                                className="text-white hover:text-[#a1b7d4] transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        )}
                        
                        {/* Logo */}
                        <Link href="/">
                        {logo?.software_logo_white && (
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${logo.software_logo_white}`} 
                            alt="logo" 
                            width={80} 
                            height={10} 
                            className="cursor-pointer" 
                        />
                    )}
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <nav className="flex items-center space-x-6">
                            {desktopNavItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-white hover:text-[#a1b7d4] font-medium transition-colors flex items-center"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {!loading && isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-[#275ea5] rounded-[10px] px-3 py-1 h-8 text-white">
                                <WalletBalance showArrow={false} size="sm" className="whitespace-nowrap" />
                            </div>
                            <Button  className="w-32 h-8 bg-[#63AE50] hover:bg-[#5ca33b] text-white">
                                <Link href="/deposit">Deposit</Link>
                            </Button>
                            <SideNav />
                            </div>
                        ) : !hideAuthButtonsOnRoutes && (
                            <>
                                <Button className="bg-[#48ac2f] hover:bg-[#5ca33b] text-white px-6 font-medium transition-colors">
                                    <Link href="/signup">REGISTRATION</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-[#a1b7d4] text-white hover:bg-[#275ea5] hover:border-white transition-colors"
                                >
                                    <Link href="/login">Login</Link>
                                </Button>
                            </>
                        )}
                        
                        <div className="flex items-center space-x-2 text-white">
                            <Globe className="w-4 h-4" />
                            <span className="text-sm">10:56 AM</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="text-white text-sm font-medium">US $</div>
                    </div>
                </div>
            </header>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 w-full h-[50px] bg-[#001529]">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-white"></div>
            
            {/* Main mobile navbar content */}
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
                    {logo?.software_logo_white && (
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${logo.software_logo_white}`} 
                            alt="logo" 
                            width={70} 
                            height={10} 
                            className="cursor-pointer" 
                        />
                    )}
                    </Link>
                </div>

                {/* Search Icon - Center Right */}
                <div className="absolute right-[38px] top-1/2 transform -translate-y-1/2">
                    <Link href="/search">
                    <button className="w-6 h-6 border-[1.625px] border-[#276AA5] rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#276AA5" strokeWidth="1.5"/>
                            <path d="m13 13-3-3" stroke="#276AA5" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </button>
                    </Link>
                </div>

                {/* Menu Button - Right side */}
                <SideNav />
            </div>
        </div>
        
        {/* Mobile Login and Registration Buttons - Below Navbar */}
        {!loading && !isAuthenticated && !hideAuthButtonsOnRoutes && (
            <div className="md:hidden fixed top-[50px] left-0 right-0 z-40 w-full h-[56px] bg-white">
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

        {/* Mobile Navigation Tabs - Only show when authenticated */}
        {!loading && isAuthenticated && (
            <div className="md:hidden fixed top-[50px] left-0 right-0 z-40 w-full h-[56px] bg-white border-b border-gray-200">
                <div className="flex items-center justify-between h-full px-2">
                    {mobileNavItems.map((item, index) => {
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