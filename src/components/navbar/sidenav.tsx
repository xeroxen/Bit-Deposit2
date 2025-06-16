"use client"

import type * as React from "react"
import { useState } from "react"
import {
  CreditCard,
  LayoutDashboard,
  Menu,
  MessageCircle,
  RefreshCcw,
  Star,
  User,
  Wallet,
  LogOut,  
  Send,
  Phone,
  
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/authContext"
import { WalletBalance } from "@/components/ui/wallet-balance"
import Link from "next/link"
import Image from "next/image"

interface NavItem {
  title: string
  icon: React.ReactNode
  href?: string
}

const navItems: NavItem[] = [
  {
    title: "Profile",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/profile",
  },
  {
    title: "Deposit History",
    icon: <RefreshCcw className="h-5 w-5" />,
    href: "/deposit-history",
  },
  {
    title: "Withdraw History",
    icon: <CreditCard className="h-5 w-5" />,
    href: "/withdraw-history",
  },
  {
    title: "Bet History",
    icon: <Wallet className="h-5 w-5" />,
    href: "/bet-history",
  },
  {
    title: "Support",
    icon: <MessageCircle className="h-5 w-5" />,
    href: "#",
  },
  {
    title: "Telegram",
    icon: <Send className="h-5 w-5" />,
    href: "#",
  },
  {
    title: "WhatsApp",
    icon: <Phone className="h-5 w-5" />,
    href: "#",
  },
]

const logoutItem: NavItem = {
  title: "Logout",
  icon: <LogOut className="h-5 w-5" />,
};

interface QuickActionProps {
  icon: React.ReactNode
  label: string
  href?: string
}

const QuickAction = ({ icon, label, href = "#" }: QuickActionProps) => (
  <a href={href} className="flex flex-col items-center justify-center gap-1 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">{icon}</div>
    <span className="text-xs font-medium">{label}</span>
  </a>
)

export function SideNav() {
  const { isAuthenticated, redirectToLogin, logout } = useAuth()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false)
  
  // Function to check authentication when the sheet is opened
  const handleSheetOpen = (open: boolean) => {
    if (!open || isAuthenticated) {
      setSheetOpen(open);
    } else {
      redirectToLogin();
    }
  }

  // Handler for desktop dropdown
  const handleDesktopDropdown = () => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
    setDesktopDropdownOpen(!desktopDropdownOpen);
  }

  // Handler for logout
  const handleLogout = () => {
    setSheetOpen(false);
    setDesktopDropdownOpen(false);
    logout();
  };

  return (
    <div className="flex items-center relative">
      {/* Desktop Dropdown */}
      <div className="hidden md:block relative">
        <Button
          onClick={handleDesktopDropdown}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 transition-all",
            desktopDropdownOpen 
              ? "bg-white hover:bg-gray-50 text-blue-600 border border-gray-200" 
              : "bg-blue-800 hover:bg-blue-900 text-white"
          )}
        >
          <span className="flex items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className={desktopDropdownOpen ? "text-blue-600" : "text-white"}
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
          </span>
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 320 512" 
            height="18" 
            width="18" 
            xmlns="http://www.w3.org/2000/svg" 
            className={cn(
              "transition-transform",
              desktopDropdownOpen ? "rotate-180 text-blue-600" : "text-white"
            )}
          >
            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
          </svg>
        </Button>

        {/* Desktop Dropdown Content */}
        {desktopDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {/* User Profile Header */}
            <div className="border-b">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                      <User className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">BD-0022033</span>
                        <div className="rounded-full bg-gray-200 p-1">
                          <Star className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                      <div className="text-xs text-blue-500">Beginner</div>
                    </div>
                  </div>
                  <WalletBalance size="sm" />
                </div>
                <div className="flex flex-row gap-4 justify-around">
                  <Link href="/deposit" onClick={() => setDesktopDropdownOpen(false)}>
                    <QuickAction 
                      icon={
                        <Image 
                          src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/profile/board/deposit.svg"  
                          width={100}
                          height={100}
                          alt="Deposit icon"
                        />
                      } 
                      label="Deposit" 
                    />
                  </Link>
                  
                  <Link href="/withdraw" onClick={() => setDesktopDropdownOpen(false)}>
                    <QuickAction 
                      icon={
                        <Image 
                          src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/profile/board/withdraw.svg"  
                          width={100}
                          height={100}
                          alt="Withdraw icon"
                        />
                      } 
                      label="Withdraw" 
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="max-h-64 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href || "/"}
                    onClick={() => setDesktopDropdownOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      index === 0 ? "bg-accent" : "",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent text-left"
                >
                  {logoutItem.icon}
                  <span>{logoutItem.title}</span>
                </button>
              </nav>
            </div>

            {/* Chat Button */}
            <div className="p-4 text-center border-t">
              <Button size="icon" className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600">
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">Chat Support</span>
              </Button>
            </div>
          </div>
        )}

        {/* Overlay to close dropdown when clicking outside */}
        {desktopDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setDesktopDropdownOpen(false)}
          />
        )}
      </div>

      {/* Mobile Sheet */}
      <Sheet open={sheetOpen} onOpenChange={handleSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[80%] max-w-sm p-0 bg-white">
          <div className="flex flex-col h-full">
            {/* User Profile Header */}
            <div className="border-b mt-7">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                      <User className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">BD-0022033</span>
                        <div className="rounded-full bg-gray-200 p-1">
                          <Star className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                      <div className="text-xs text-blue-500">Beginner</div>
                    </div>
                  </div>
                  <WalletBalance size="sm" />
                </div>
                <div className="flex flex-row gap-4 justify-around">
                  <Link href="/deposit" onClick={() => setSheetOpen(false)}>
                    <QuickAction 
                      icon={
                        <Image 
                          src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/profile/board/deposit.svg"  
                          width={100}
                          height={100}
                          alt="Deposit icon"
                        />
                      } 
                      label="Deposit" 
                    />
                  </Link>
                  
                  <Link href="/withdraw" onClick={() => setSheetOpen(false)}>
                    <QuickAction 
                      icon={
                        <Image 
                          src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/profile/board/withdraw.svg"  
                          width={100}
                          height={100}
                          alt="Withdraw icon"
                        />
                      } 
                      label="Withdraw" 
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href || "/"}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      index === 0 ? "bg-accent" : "",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent text-left"
                >
                  {logoutItem.icon}
                  <span>{logoutItem.title}</span>
                </button>
              </nav>
            </div>

            {/* Chat Button (Fixed) */}
            <div className="sticky bottom-4 left-4 right-4 text-center">
              <Button size="icon" className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600">
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">Chat Support</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}