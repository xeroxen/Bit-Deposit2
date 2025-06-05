"use client"

import { useWallet } from "@/lib/walletContext"
import { ArrowRight } from "lucide-react"

interface WalletBalanceProps {
  showArrow?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function WalletBalance({ 
  showArrow = true,
  size = "sm",
  className = ""
}: WalletBalanceProps) {
  const { balance, isLoading, symbol } = useWallet()
  
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }
  
  return (
    <div className={`flex items-center gap-1 text-blue-500 ${className}`}>
      <span className={`font-medium ${sizeClasses[size]}`}>{symbol}</span>
      <span className={`font-medium ${sizeClasses[size]}`}>
        {isLoading ? "..." : balance}
      </span>
      {showArrow && <ArrowRight className={`h-${size === "sm" ? 4 : size === "md" ? 5 : 6} w-${size === "sm" ? 4 : size === "md" ? 5 : 6}`} />}
    </div>
  )
} 