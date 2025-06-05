"use client"

import { useState, useEffect } from "react"
import { CricketBettingInterface, Match } from "./cricket-betting-interface"
import { Loader2 } from "lucide-react"
import { BetModal } from "./bet-modal"
import { isAuthenticated } from "@/lib/authentication"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function CricketBettingDemo() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const router = useRouter()

  const [betModalData, setBetModalData] = useState<{
    isOpen: boolean;
    matchId: string;
    team: string;
    teamId: number;
    odds: number;
  } | null>(null)

  // Check authentication status
  useEffect(() => {
    setUserAuthenticated(isAuthenticated())
    
    // Listen for auth status changes
    const handleAuthChange = () => {
      setUserAuthenticated(isAuthenticated())
    }
    
    // Listen for custom auth events and storage changes
    window.addEventListener('auth_status_changed', handleAuthChange)
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_status_changed') {
        setUserAuthenticated(isAuthenticated())
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('auth_status_changed', handleAuthChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (isInitialLoad) {
          setLoading(true)
        }
        
        // Fetch matches from our cached API route
        const response = await fetch('/api/cricket/matches')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch matches: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Check cache status from headers
        const cacheStatus = response.headers.get('X-Cache-Status')
        console.log(`Data fetched with cache status: ${cacheStatus}`)
        
        // Filter matches by status
        const live = data.filter((match: Match) => match.status === "Live")
        const upcoming = data.filter((match: Match) => match.status === "Not Started")
        
        setLiveMatches(live)
        setUpcomingMatches(upcoming)
        setError(null)
        
        console.log('Updated matches from server cache', { live: live.length, upcoming: upcoming.length })
        
      } catch (err) {
        console.error('Error fetching matches:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch matches')
      } finally {
        if (isInitialLoad) {
          setLoading(false)
          setIsInitialLoad(false)
        }
      }
    }

    fetchMatches()
    
    const interval = setInterval(fetchMatches, 5000)
    
    return () => clearInterval(interval)
  }, [isInitialLoad])

  const handleOddsClick = (matchId: string, team: 'home' | 'away', odds: number) => {
    // Check authentication before opening bet modal
    if (!isAuthenticated()) {
      toast.error("Please login to place a bet");
      router.push('/login');
      return;
    }

    // Check both live and upcoming matches
    const allMatches = [...liveMatches, ...upcomingMatches]
    const match = allMatches.find((m) => m.matchId === matchId)
    if (match) {
      setBetModalData({
        isOpen: true,
        matchId,
        team: team === 'home' ? match.home.name : match.away.name,
        teamId: team === 'home' ? parseInt(match.home.id) : parseInt(match.away.id),
        odds
      })
    }
  }

  const totalMatches = liveMatches.length + upcomingMatches.length

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Cricket Matches</h1>

      {/* Authentication prompt banner */}
      {!userAuthenticated && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg border border-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.58L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Login to Start Betting</h3>
                  <p className="text-sm text-blue-100">Join now to place bets on your favorite cricket matches with real-time odds!</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Login Now
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        </div>
      ) : error ? (
        <div className="border border-gray-200 shadow-sm">
          <div className="p-4 text-red-500 text-center">
            {error}
          </div>
        </div>
      ) : totalMatches === 0 ? (
        <div className="border border-gray-200 shadow-sm">
          <div className="p-8 text-center text-gray-500">
            No matches found
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-3 font-semibold flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-lg">🏏 All Cricket Matches</span>
              <div className="flex items-center space-x-2">
                {liveMatches.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {liveMatches.length} LIVE
                    </span>
                  </div>
                )}
                {upcomingMatches.length > 0 && (
                  <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {upcomingMatches.length} UPCOMING
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm opacity-90">
              Total: {totalMatches}
            </div>
          </div>
          <CricketBettingInterface
            matches={[...liveMatches, ...upcomingMatches]}
            onOddsClick={handleOddsClick}
            headerBackgroundColor={"#1e2e3d"}
            subheaderBackgroundColor={"#c9d1d9"}
            backOddsColor={"#a3d0f5"}
            layOddsColor={"#f5a3c7"}
          />
        </div>
      )}

      {betModalData && (
        <BetModal
          isOpen={betModalData.isOpen}
          onClose={() => setBetModalData(null)}
          matchId={betModalData.matchId}
          teamName={betModalData.team}
          teamId={betModalData.teamId}
          odd={betModalData.odds}
        />
      )}
    </div>
  )
}