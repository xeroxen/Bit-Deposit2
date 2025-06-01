"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"
import Image from "next/image"

export default function EvolutionBanner() {
  const latestGames = [
    {
      id: 1,
      title: "Marble Race",
      image: "/placeholder.svg?height=120&width=160",
    },
    {
      id: 2,
      title: "Super Color Game",
      image: "/placeholder.svg?height=120&width=160",
    },
    {
      id: 3,
      title: "Fireball Roulette",
      image: "/placeholder.svg?height=120&width=160",
    },
  ]

  const featuredGames = [
    {
      id: 1,
      image: "/placeholder.svg?height=200&width=280",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=280",
    },
  ]

  return (
    <div className="relative w-full max-w-[382px] h-[168px] mx-auto overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-400 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 p-4 lg:p-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
          <div className="space-y-3 lg:space-y-4">
            <p className="text-white/80 text-xs lg:text-sm font-medium tracking-wide uppercase">Provider Of The Month</p>

            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-purple-600 rounded-full"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white">Evolution</h1>
            </div>
          </div>

          <Button
            size="lg"
            className="w-fit bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-sm lg:text-base"
          >
            <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-2 fill-white" />
            Play Now
          </Button>
        </div>

        {/* Right Section */}
        <div className="space-y-4 lg:space-y-6">
          {/* Games Section */}
          {/* <div className="space-y-3 lg:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-white text-lg lg:text-xl font-semibold">Games</h2>
              <p className="text-white/60 text-xs lg:text-sm">25 thrilling games to boost your adrenaline</p>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-3">
              {featuredGames.map((game) => (
                <Card
                  key={game.id}
                  className="overflow-hidden bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt="Featured game"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div> */}

          {/* Latest Games Section */}
          {/* <div className="space-y-3 lg:space-y-4">
            <h3 className="text-white text-base lg:text-lg font-semibold">Latest Games</h3>
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {latestGames.map((game) => (
                <Card
                  key={game.id}
                  className="overflow-hidden bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-1.5 lg:p-2">
                    <p className="text-white text-[10px] lg:text-xs font-medium truncate">{game.title}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/30 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/30 to-transparent rounded-full blur-xl"></div>
    </div>
  )
}
