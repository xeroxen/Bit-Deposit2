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
import Marquee from 'react-fast-marquee';

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

    const marqueeText = "বন্ধুকে নিয়ে আসুন, প্রতি রেফারেলে ৩০০ টাকা করে আয় করুন! Raza20-এ এখনই জয় শুরু করুন! অফারটি সীমিত সময়ের জন্য। টাকা সরাররি মেইন একাউন্ট এ যোগ হবে।";

    return (
        <div className="fixed inset-0 z-50 flex flex-col w-full pointer-events-none overflow-hidden">
            {/* Desktop Marquee */}
            <div className="hidden md:block w-full bg-[#1d3d68] pointer-events-auto">
                <Marquee
                    speed={50}
                    pauseOnHover
                    className="leading-none"
                >
                    <p className="py-0 text-white font-medium text-sm leading-[24px] pr-8">
                        {marqueeText}
                    </p>
                </Marquee>
            </div>
            
            {/* Desktop Navbar */}
            <div className="hidden md:block w-full bg-[#1d3d68] border-b border-[#275ea5] pointer-events-auto">
                <header className="px-3 py-1.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
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
                            <nav className="flex items-center space-x-3">
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
                        
                        <div className="flex items-center space-x-2">
                            {!loading && isAuthenticated ? (
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center bg-[#275ea5] rounded-[10px] px-2 py-0 h-7 text-white">
                                    <WalletBalance showArrow={false} size="sm" className="whitespace-nowrap" />
                                </div>
                                <Button className="w-28 h-7 bg-[#63AE50] hover:bg-[#5ca33b] text-white px-2 py-0">
                                    <Link href="/deposit">Deposit</Link>
                                </Button>
                                <SideNav />
                                </div>
                            ) : !hideAuthButtonsOnRoutes && (
                                <>
                                    <Button className="bg-[#48ac2f] hover:bg-[#5ca33b] text-white px-4 py-0 h-7 font-medium transition-colors">
                                        <Link href="/signup">REGISTRATION</Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-[#a1b7d4] text-white hover:bg-[#275ea5] hover:border-white transition-colors h-7 px-3 py-0"
                                    >
                                        <Link href="/login">Login</Link>
                                    </Button>
                                </>
                            )}
                            
                            <div className="flex items-center space-x-1 text-white">
                                <Globe className="w-4 h-4" />
                                <span className="text-xs">10:56 AM</span>
                                <ChevronDown className="w-4 h-4" />
                            </div>
                            <div className="text-white text-xs font-medium">US $</div>
                        </div>
                    </div>
                </header>
            </div>

            {/* Mobile Container */}
            <div className="md:hidden flex flex-col w-full bg-white">
                {/* Mobile Marquee */}
                <div className="w-full bg-[#1d3d68] pointer-events-auto">
                    <Marquee
                        speed={40}
                        pauseOnHover
                        className="leading-none"
                    >
                        <p className="py-0 text-white text-xs font-medium leading-[22px] pr-8">
                            {marqueeText}
                        </p>
                    </Marquee>
                </div>

                {/* Mobile Navbar */}
                <div className="w-full h-[46px] relative pointer-events-auto">
                    {/* Background overlay */}
                    <div className="absolute inset-0 "></div>
                    
                    {/* Main mobile navbar content */}
                    <div className="relative h-full flex items-center justify-between px-2">
                        
                        {/* Language Selector or Wallet Balance - Left side */}
                        {!loading && isAuthenticated ? (
                            <div className="flex items-center bg-[#F3F6FA] rounded-[20px] px-2 py-0 h-7">
                                <WalletBalance showArrow={false} size="sm" className="whitespace-nowrap" />
                                <Link href="/deposit" className="ml-1">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Plus className="text-white w-3 h-3" />
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center bg-[#F3F6FA] rounded-[20px] px-2 py-0 h-7">
                                <div className="flex items-center space-x-1">
                                    {/* US Flag placeholder */}
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 via-white to-blue-500 border border-gray-300 flex-shrink-0"></div>
                                    <span className="text-xs font-medium text-black/88 whitespace-nowrap">US</span>
                                </div>
                                
                                {/* Dropdown arrow */}
                                <div className="ml-1 w-4 h-4  rounded-full shadow-md flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-2" viewBox="0 0 14 8" fill="none">
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
                            <button className="w-6 h-6 border-[1.5px] border-[#276AA5] rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
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
                    <div className="w-full h-[46px]   pointer-events-auto">
                        <div className="flex items-center justify-center h-full px-4 gap-3">
                            {/* Login Button */}
                            <Link href="/login" className="w-full max-w-[170px]">
                                <div className="w-full h-[36px] bg-[#4094FF] rounded-[25px] flex items-center justify-center">
                                    <span className="font-inter font-bold text-sm text-white">
                                        Log In
                                    </span>
                                </div>
                            </Link>
                            
                            {/* Registration Button */}
                            <Link href="/signup" className="w-full max-w-[170px]">
                                <div className="w-full h-[36px] bg-[#22C55E] rounded-[25px] flex items-center justify-center">
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
                    <div className="w-full h-[46px]  pointer-events-auto">
                        <div className="flex items-center justify-between h-full px-2">
                            {mobileNavItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                const IconComponent = item.icon;
                                return (
                                    <Link href={item.href} key={index} className="flex-1">
                                        <div className={`flex flex-col items-center justify-center h-full ${isActive ? 'border-b-2 border-blue-500' : ''}`}>
                                            <div className="w-5 h-5 mb-0 flex items-center justify-center">
                                                <IconComponent 
                                                    size={18} 
                                                    className={`${isActive ? 'text-blue-500' : 'text-gray-500'}`} 
                                                />
                                            </div>
                                            <span className={`text-[10px] font-medium ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                                                {item.name}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;