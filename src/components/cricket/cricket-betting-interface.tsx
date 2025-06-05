"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, X, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { isAuthenticated } from "@/lib/authentication"

// Add interfaces for tracking changes
interface ValueChange {
  isChanged: boolean
  increased?: boolean
  previousValue?: number
}

interface MatchChanges {
  [matchId: string]: {
    homeRuns: ValueChange
    homeWickets: ValueChange
    awayRuns: ValueChange
    awayWickets: ValueChange
    homeOdds: ValueChange
    awayOdds: ValueChange
  }
}

export interface TeamData {
  id: string
  name: string
  runs: number
  wickets: number
  winner: boolean
  totalscore: string
  odds: number
}

export interface Match {
  matchId: string
  away: TeamData
  home: TeamData
  status: string
}

export interface CricketBettingInterfaceProps {
  matches?: Match[]
  onOddsClick?: (matchId: string, team: 'home' | 'away', odds: number) => void
  onClose?: () => void
  onMinimize?: () => void
  className?: string
  headerBackgroundColor?: string
  subheaderBackgroundColor?: string
  backOddsColor?: string
  layOddsColor?: string
}

export function CricketBettingInterface({
  matches = [],
  onOddsClick,
  onClose,
  onMinimize,
  className,
  headerBackgroundColor = "#1e2e3d",
  subheaderBackgroundColor = "#c9d1d9",
  backOddsColor = "#a3d0f5",
  layOddsColor = "#f5a3c7",
}: CricketBettingInterfaceProps) {
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [previousMatches, setPreviousMatches] = React.useState<Match[]>([])
  const [changes, setChanges] = React.useState<MatchChanges>({})
  const [userAuthenticated, setUserAuthenticated] = React.useState(false)

  // Check authentication status
  React.useEffect(() => {
    setUserAuthenticated(isAuthenticated())
    
    // Listen for auth status changes
    const handleAuthChange = () => {
      setUserAuthenticated(isAuthenticated())
    }
    
    // Listen for custom auth events
    window.addEventListener('auth_status_changed', handleAuthChange)
    
    // Listen for storage changes (for cross-tab authentication updates)
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

  // Track changes when matches update
  React.useEffect(() => {
    const newChanges: MatchChanges = {}

    matches.forEach((match) => {
      const prevMatch = previousMatches.find((m) => m.matchId === match.matchId)
      if (prevMatch) {
        newChanges[match.matchId] = {
          homeRuns: {
            isChanged: prevMatch.home.runs !== match.home.runs,
            increased: prevMatch.home.runs < match.home.runs,
            previousValue: prevMatch.home.runs
          },
          homeWickets: {
            isChanged: prevMatch.home.wickets !== match.home.wickets,
            increased: prevMatch.home.wickets < match.home.wickets,
            previousValue: prevMatch.home.wickets
          },
          awayRuns: {
            isChanged: prevMatch.away.runs !== match.away.runs,
            increased: prevMatch.away.runs < match.away.runs,
            previousValue: prevMatch.away.runs
          },
          awayWickets: {
            isChanged: prevMatch.away.wickets !== match.away.wickets,
            increased: prevMatch.away.wickets < match.away.wickets,
            previousValue: prevMatch.away.wickets
          },
          homeOdds: {
            isChanged: prevMatch.home.odds !== match.home.odds,
            increased: prevMatch.home.odds < match.home.odds,
            previousValue: prevMatch.home.odds
          },
          awayOdds: {
            isChanged: prevMatch.away.odds !== match.away.odds,
            increased: prevMatch.away.odds < match.away.odds,
            previousValue: prevMatch.away.odds
          }
        }
      }
    })

    setChanges(newChanges)
    setPreviousMatches(matches)

    // Clear changes after animation
    const timeout = setTimeout(() => {
      setChanges({})
    }, 2000) // Increased duration to 2 seconds for better visibility

    return () => clearTimeout(timeout)
  }, [matches, previousMatches])

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
    if (onMinimize) onMinimize()
  }

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleOddsClick = (matchId: string, team: 'home' | 'away', odds: number) => {
    if (onOddsClick) {
      onOddsClick(matchId, team, odds)
    }
  }

  const renderChangeIndicator = (change?: ValueChange) => {
    if (!change?.isChanged) return null
    const changeValue = change.previousValue ? 
      ((change.increased ? '+' : '') + (change.increased ? 1 : -1)) : '';
    return (
      <span className={cn(
        "inline-flex items-center ml-1 text-[10px]",
        change.increased ? "text-green-500" : "text-red-500",
        "animate-fade-in"
      )}>
        {change.increased ? (
          <ChevronUp className="h-3 w-3 inline animate-bounce" />
        ) : (
          <ChevronDown className="h-3 w-3 inline animate-bounce" />
        )}
        <span className="ml-0.5">{changeValue}</span>
      </span>
    )
  }

  return (
    <Card className={cn("w-full rounded-none border-0 shadow-none overflow-hidden", className)}>
      <CardHeader
        className="flex flex-row items-center justify-between p-2 px-3 rounded-none"
        style={{ backgroundColor: headerBackgroundColor }}
      >
        <div className="flex items-center gap-3">
          <span className="text-white font-medium text-sm">Live Cricket Matches</span>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
            userAuthenticated 
              ? "bg-green-500/20 text-green-300 border border-green-500/30" 
              : "bg-red-500/20 text-red-300 border border-red-500/30"
          )}>
            {userAuthenticated ? (
              <>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Ready to bet</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                <span>Login to bet</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleMinimize} className="text-white hover:text-gray-200 focus:outline-none">
            {isMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
          <button onClick={handleClose} className="text-white hover:text-gray-200 focus:outline-none">
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr_2fr] text-xs py-2 px-3 bg-gray-100 border-b border-gray-300"
            style={{ backgroundColor: subheaderBackgroundColor }}
          >
            <div className="hidden md:block text-left font-medium">Match</div>
            <div className="hidden md:block text-left font-medium">Runs/Wickets (H)</div>
            <div className="hidden md:block text-left font-medium">Runs/Wickets (A)</div>
            <div className="hidden md:block text-center font-medium">Odds (H/A)</div>
          </div>

          <CardContent className="p-0">
            {matches.map((match) => {
              const matchChanges = changes[match.matchId] || {}
              return (
                <div
                  key={match.matchId}
                  className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr_2fr] items-start md:items-center py-3 px-3 border-b border-gray-200 hover:bg-gray-50 gap-y-3"
                >
                  {/* Match Details - Always at top on mobile */}
                  <div className="flex flex-col gap-1">
                    <div className="text-sm">
                      <span className="font-medium text-blue-600">{match.home.name}</span>
                      <span className="text-gray-600"> vs </span>
                      <span className="font-medium text-blue-600">{match.away.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="w-fit text-[10px] h-4 font-normal border-green-500 text-green-600 bg-green-50 px-1.5 rounded-sm uppercase"
                      >
                        {match.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Mobile Score View */}
                  <div className="md:hidden grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] font-medium text-gray-500 uppercase">Home</div>
                      <div className={cn(
                        "flex items-center gap-1",
                        matchChanges.homeRuns?.isChanged && "bg-blue-50 rounded-sm p-1 transition-colors duration-1000"
                      )}>
                        <span className="text-blue-600 font-medium">R:</span>
                        <span className="text-blue-600">{match.home.runs}</span>
                        {renderChangeIndicator(matchChanges.homeRuns)}
                      </div>
                      <div className={cn(
                        "flex items-center gap-1",
                        matchChanges.homeWickets?.isChanged && "bg-blue-50 rounded-sm p-1 transition-colors duration-1000"
                      )}>
                        <span className="text-blue-600 font-medium">W:</span>
                        <span className="text-blue-600">{match.home.wickets}</span>
                        {renderChangeIndicator(matchChanges.homeWickets)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-medium text-gray-500 uppercase">Away</div>
                      <div className={cn(
                        "flex items-center gap-1",
                        matchChanges.awayRuns?.isChanged && "bg-gray-50 rounded-sm p-1 transition-colors duration-1000"
                      )}>
                        <span className="text-gray-600 font-medium">R:</span>
                        <span className="text-gray-600">{match.away.runs}</span>
                        {renderChangeIndicator(matchChanges.awayRuns)}
                      </div>
                      <div className={cn(
                        "flex items-center gap-1",
                        matchChanges.awayWickets?.isChanged && "bg-gray-50 rounded-sm p-1 transition-colors duration-1000"
                      )}>
                        <span className="text-gray-600 font-medium">W:</span>
                        <span className="text-gray-600">{match.away.wickets}</span>
                        {renderChangeIndicator(matchChanges.awayWickets)}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Score View - Home */}
                  <div className="hidden md:flex flex-col gap-2">
                    <div className={cn(
                      "flex items-center gap-1",
                      matchChanges.homeRuns?.isChanged && "bg-blue-50 rounded-sm p-1 transition-colors duration-1000"
                    )}>
                      <span className="text-blue-600 font-medium">R:</span>
                      <span className="text-blue-600">{match.home.runs}</span>
                      {renderChangeIndicator(matchChanges.homeRuns)}
                    </div>
                    <div className={cn(
                      "flex items-center gap-1",
                      matchChanges.homeWickets?.isChanged && "bg-blue-50 rounded-sm p-1 transition-colors duration-1000"
                    )}>
                      <span className="text-blue-600 font-medium">W:</span>
                      <span className="text-blue-600">{match.home.wickets}</span>
                      {renderChangeIndicator(matchChanges.homeWickets)}
                    </div>
                  </div>

                  {/* Desktop Score View - Away */}
                  <div className="hidden md:flex flex-col gap-2">
                    <div className={cn(
                      "flex items-center gap-1",
                      matchChanges.awayRuns?.isChanged && "bg-gray-50 rounded-sm p-1 transition-colors duration-1000"
                    )}>
                      <span className="text-gray-600 font-medium">R:</span>
                      <span className="text-gray-600">{match.away.runs}</span>
                      {renderChangeIndicator(matchChanges.awayRuns)}
                    </div>
                    <div className={cn(
                      "flex items-center gap-1",
                      matchChanges.awayWickets?.isChanged && "bg-gray-50 rounded-sm p-1 transition-colors duration-1000"
                    )}>
                      <span className="text-gray-600 font-medium">W:</span>
                      <span className="text-gray-600">{match.away.wickets}</span>
                      {renderChangeIndicator(matchChanges.awayWickets)}
                    </div>
                  </div>

                  {/* Odds - Same for both mobile and desktop */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={cn(
                        "py-2 px-3 text-center text-xs rounded-sm font-medium transition-all relative",
                        userAuthenticated 
                          ? "hover:opacity-90 active:scale-95 cursor-pointer" 
                          : "opacity-60 cursor-not-allowed",
                        matchChanges.homeOdds?.isChanged && "animate-pulse"
                      )}
                      style={{ backgroundColor: backOddsColor }}
                      onClick={() => handleOddsClick(match.matchId, 'home', match.home.odds)}
                      title={!userAuthenticated ? "Login required to place bet" : `Bet on ${match.home.name}`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {!userAuthenticated && <Lock className="h-3 w-3" />}
                        <span>{match.home.odds.toFixed(2)}</span>
                        {renderChangeIndicator(matchChanges.homeOdds)}
                      </div>
                    </button>
                    <button
                      className={cn(
                        "py-2 px-3 text-center text-xs rounded-sm font-medium transition-all relative",
                        userAuthenticated 
                          ? "hover:opacity-90 active:scale-95 cursor-pointer" 
                          : "opacity-60 cursor-not-allowed",
                        matchChanges.awayOdds?.isChanged && "animate-pulse"
                      )}
                      style={{ backgroundColor: layOddsColor }}
                      onClick={() => handleOddsClick(match.matchId, 'away', match.away.odds)}
                      title={!userAuthenticated ? "Login required to place bet" : `Bet on ${match.away.name}`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {!userAuthenticated && <Lock className="h-3 w-3" />}
                        <span>{match.away.odds.toFixed(2)}</span>
                        {renderChangeIndicator(matchChanges.awayOdds)}
                      </div>
                    </button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </>
      )}
    </Card>
  )
}

