"use client"

import type React from "react"

import { useState } from "react"
import { Home, Heart, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/authContext"

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
    id: "logout",
    label: "Logout",
    icon: LogOut,
    href: "/logout",
  },
]

export default function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("home")
  const { logout, isAuthenticated, redirectToLogin } = useAuth()

  // Dynamically set navigation items based on authentication
  const navItems = isAuthenticated
    ? navigationItems
    : navigationItems.map(item =>
        item.id === "logout"
          ? { ...item, id: "login", label: "Login", icon: LogOut, href: "/login" }
          : item
      )

  const handleItemClick = (itemId: string, href: string) => {
    setActiveItem(itemId)
    if (itemId === "logout") {
      logout()
    } else if (itemId === "login") {
      redirectToLogin()
    } else {
      // Handle navigation logic here
      console.log(`Navigating to: ${href}`)
      window.location.href = href
    }
  }

  return (
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
  )
}
