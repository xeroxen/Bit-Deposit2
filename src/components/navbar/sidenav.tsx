"use client"

import type * as React from "react"
import { useState } from "react"
import {
  // CreditCard,
  // Gift,
  // History,
  LayoutDashboard,
  Menu,
  MessageCircle,
  // RefreshCcw,
  // Settings,
  Star,
  // Ticket,
  Upload,
  User,
  // Users,
  Wallet,
  Download,
  // Gamepad2,
  // Crown,
  // Tag,
  LogOut
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/authContext"
import { WalletBalance } from "@/components/ui/wallet-balance"
import Link from "next/link"

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
  // {
  //   title: "Transactions",
  //   icon: <RefreshCcw className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Beneficiaries",
  //   icon: <Users className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "My Lottery",
  //   icon: <Ticket className="h-5 w-5" />,
  //   href: "#",
  // },
  {
    title: "Bet History",
    icon: <Wallet className="h-5 w-5" />,
    href: "/bet-history",
  },
  // {
  //   title: "Withdraw Accounts",
  //   icon: <CreditCard className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Redeem History",
  //   icon: <History className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Game History",
  //   icon: <Gamepad2 className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Point History",
  //   icon: <Star className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Bonus History",
  //   icon: <Gift className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "VIP Levels",
  //   icon: <Crown className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Promo-codes",
  //   icon: <Tag className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Settings",
  //   icon: <Settings className="h-5 w-5" />,
  //   href: "#",
  // },
  // {
  //   title: "Refer to Friend",
  //   icon: <User className="h-5 w-5" />,
  //   href: "#",
  // },
  {
    title: "Support",
    icon: <MessageCircle className="h-5 w-5" />,
    href: "#",
  },
]

// Add a logout item that will call the logout function when clicked
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

export function MobileNav() {
  const { isAuthenticated, redirectToLogin, logout } = useAuth()
  const [sheetOpen, setSheetOpen] = useState(false)
  
  // Function to check authentication when the sheet is opened
  const handleSheetOpen = (open: boolean) => {
    // Only open the sheet if it's closing or user is authenticated
    if (!open || isAuthenticated) {
      setSheetOpen(open);
    } else {
      // If trying to open while not authenticated, redirect without opening
      redirectToLogin();
    }
  }

  // Handler for logout
  const handleLogout = () => {
    setSheetOpen(false);
    logout();
  };

  return (
    <div className="flex items-center">
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
                  <WalletBalance size="sm"  />
                </div>
                <div className="flex flex-row gap-4 justify-around">
                  <Link href="/deposit" onClick={() => setSheetOpen(false)}><QuickAction icon={<Upload className="h-5 w-5" />} label="Deposit" /></Link>
                  <Link href="/withdraw" onClick={() => setSheetOpen(false)}><QuickAction icon={<Download className="h-5 w-5" />} label="Withdraw" /></Link>
                  {/* <Link href="/transfer" onClick={() => setSheetOpen(false)}><QuickAction icon={<Send className="h-5 w-5" />} label="Transfer" /></Link> */}
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
                {/* Logout button */}
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
