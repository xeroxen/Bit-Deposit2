"use client"

import { useWallet } from "@/lib/walletContext"
import { ArrowRight, RefreshCw, Loader2 } from "lucide-react"
import { Skeleton } from "./skeleton"
import { Button } from "./button"

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
  const { balance, isLoading, symbol, refreshBalance } = useWallet()
  
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }
  
  return (
    <div className={`flex items-center gap-1 text-black sm:text-white ${className}`}>
      <span className={`font-medium ${sizeClasses[size]}`}>{symbol}</span>
      <span className={`font-medium  ${sizeClasses[size]}`}>
        {isLoading ? (
          <Skeleton className={`inline-block align-middle ${size === "sm" ? "h-4 w-10" : size === "md" ? "h-5 w-16" : "h-6 w-24"}`} />
        ) : balance}
      </span>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="ml-1 hover:bg-transparent hover:border-transparent focus:bg-transparent focus:border-transparent"
        onClick={refreshBalance}
        disabled={isLoading}
        aria-label="Refresh balance"
      >
        {isLoading ? (
          <Loader2 className="animate-spin size-4" />
        ) : (
          <RefreshCw className="size-4  " />
        )}
      </Button>
      {showArrow && <ArrowRight className={`h-${size === "sm" ? 4 : size === "md" ? 5 : 6} w-${size === "sm" ? 4 : size === "md" ? 5 : 6}`} />}
    </div>
  )
} 