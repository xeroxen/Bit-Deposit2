"use client"

import type React from "react"

import { useState } from "react"
import { Home, Heart, Gift } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/authContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getUserData } from "@/lib/authentication"

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    id: "favourites",
    label: "Favourites",
    icon: Heart,
    href: "/favourites",
  },
  {
    id: "refer",
    label: "Refer",
    icon: Gift,
    href: "#refer-modal",
  },
]

export default function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("home")
  const [referOpen, setReferOpen] = useState(false)
  const { isAuthenticated, redirectToLogin } = useAuth()

  // Dynamically set navigation items based on authentication
  const navItems = isAuthenticated
    ? navigationItems
    : navigationItems.map(item =>
        item.id === "refer"
          ? { ...item, id: "login", label: "Login", icon: Gift, href: "/login" }
          : item
      )

  const handleItemClick = (itemId: string, href: string) => {
    setActiveItem(itemId)
    if (itemId === "refer") {
      setReferOpen(true)
    } else if (itemId === "login") {
      redirectToLogin()
    } else {
      window.location.href = href
    }
  }

  // Get referral code from user data
  const userData = typeof window !== 'undefined' ? getUserData() : null
  const referralCode = userData?.inviter_code || ""
  const referralLink = referralCode ? `${window?.location?.origin || ''}/signup?referer=${referralCode}` : ""

  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
    }
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around items-center py-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.href)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-1 transition-all duration-200 ease-in-out",
                    "hover:bg-gray-50 rounded-lg",
                    isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  <div className={cn("relative p-1 rounded-full transition-all duration-200", isActive && "bg-blue-100")}> 
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-all duration-200",
                        isActive ? "text-blue-600 scale-110" : "text-gray-500",
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium mt-0.5 transition-all duration-200 truncate max-w-full",
                      isActive ? "text-blue-600" : "text-gray-500",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
      {/* Refer Modal */}
      <Dialog open={referOpen} onOpenChange={setReferOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Refer Your Friend</DialogTitle>
            <DialogDescription>
              Refer your friend to get rewards!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-2 py-4">
            <span className="text-sm text-gray-600">Your Referral Code:</span>
            <span className="text-lg font-bold text-blue-600">{referralCode}</span>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="border rounded px-2 py-1 text-xs w-48 bg-gray-100 text-gray-700"
              />
              <Button size="sm" variant="outline" onClick={handleCopy}>
                Copy Link
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
