"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getAuthToken } from "./authentication"

interface WalletData {
  id: number
  user_id: number
  currency: string
  symbol: string
  balance: string
  balance_bonus_rollover: string
  balance_deposit_rollover: string
  balance_withdrawal: string
  balance_bonus: string
  balance_cryptocurrency: string
  balance_demo: string
  refer_rewards: string
  hide_balance: number
  active: number
  created_at: string
  updated_at: string
  total_bet: string
  total_won: number
  total_lose: number
  last_won: number
  last_lose: number
  vip_level: number
  vip_points: number
  total_balance: number
}

/**
 * Interface defining the shape of data and methods provided by the WalletContext
 */
interface WalletContextType {
  /** Current wallet balance as a string */
  balance: string
  /** Currency symbol */
  symbol: string
  /** Function to manually refresh the wallet balance */
  refreshBalance: () => Promise<void>
  /** Loading state for wallet balance */
  isLoading: boolean
  /** Complete wallet data */
  walletData: WalletData | null
}

/** React Context for wallet data */
const WalletContext = createContext<WalletContextType | undefined>(undefined)

/**
 * Provider component that fetches and manages wallet balance
 * 
 * Wraps children with the WalletContext.Provider and handles:
 * - Initial balance fetching on mount
 * - Balance refreshing when needed
 * - Loading state management
 */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState("0.00")
  const [symbol, setSymbol] = useState("৳")
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBalance = async () => {
    try {
      setIsLoading(true)
      const token = getAuthToken()
      
      if (!token) {
        console.warn("No auth token available for wallet fetch")
        return
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/wallet`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch wallet balance')
      }
      
      const data = await response.json()
      
      if (data && data.wallet) {
        setWalletData(data.wallet)
        setBalance(data.wallet.balance || "0.00")
        setSymbol(data.wallet.symbol || "৳")
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Listen for balance update events
  useEffect(() => {
    const handleBalanceUpdate = () => {
      fetchBalance()
    }
    
    window.addEventListener('balanceUpdated', handleBalanceUpdate)
    
    // Also check for changes in localStorage (for cross-tab synchronization)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'balance_updated') {
        fetchBalance()
      }
    }

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchBalance()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Initial fetch
    if (document.visibilityState === 'visible') {
      fetchBalance()
    }
    
    return () => {
      window.removeEventListener('balanceUpdated', handleBalanceUpdate)
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const refreshBalance = async () => {
    await fetchBalance()
  }

  return (
    <WalletContext.Provider value={{ balance, symbol, refreshBalance, isLoading, walletData }}>
      {children}
    </WalletContext.Provider>
  )
}

/**
 * Custom hook to access wallet data from the WalletContext
 * 
 * @returns {WalletContextType} Object containing balance, symbol, refreshBalance function, and loading state
 * @throws {Error} If used outside of a WalletProvider
 */
export function useWallet() {
  const context = useContext(WalletContext)
  
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  
  return context
} 