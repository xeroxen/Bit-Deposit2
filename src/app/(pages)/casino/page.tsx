"use client"
import Image from "next/image"
import { useGameContext } from "@/lib/gameContext"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useSingleGameRedirect } from "@/hooks/singGameRedirect"
import { useMemo } from "react"
import { memo } from "react"

// Enhanced responsive GameCard
const GameCard = memo(({ cover }: { cover?: string }) => (
  <div className="relative w-[92px] h-[96px] md:w-[140px] md:h-[150px] lg:w-[180px] lg:h-[190px] bg-white rounded-[8px] md:rounded-[12px] lg:rounded-[16px] flex flex-col items-center p-2 md:p-3 lg:p-4 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
    {cover && (
      <div
        className="absolute inset-0 w-full h-full bg-gray-200"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
    )}
  </div>
))
GameCard.displayName = "GameCard"

const CasinoCarousel = ({ title, gameId }: { title: string; gameId: number }) => {
  const { games, gameProviders, loading } = useGameContext()
  const singleGameRedirect = useSingleGameRedirect()

  // Get all game IDs for category id 2 (livecasino)
  const liveCasinoGameIds = useMemo(
    () => gameProviders?.data?.filter((rel) => rel.category_id === gameId).map((rel) => rel.game_id) || [],
    [gameProviders, gameId],
  )

  // Get all games from all providers
  const allGames = useMemo(() => games?.providers?.flatMap((p) => p.games || []) || [], [games])

  // Filter games for livecasino
  const liveCasinoGames = useMemo(
    () => allGames.filter((game) => liveCasinoGameIds.includes(game.id)),
    [allGames, liveCasinoGameIds],
  )

  if (loading) return null
  if (!liveCasinoGames.length) return null

  return (
    <div className="w-full flex flex-col py-4 md:py-6 lg:py-8">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-start mb-4">{title}</h1>
      </div>
      <div className="w-full px-4 md:px-6 lg:px-8 relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
            {liveCasinoGames.map((game) => (
              <CarouselItem
                key={game.id}
                className="pl-2 md:pl-4 lg:pl-6 basis-auto cursor-pointer"
                onClick={() => singleGameRedirect(game.id, game.game_name)}
              >
                <GameCard cover={game.cover ? `${process.env.NEXT_PUBLIC_API_URL}/game/${game.cover}` : undefined} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Fixed carousel navigation buttons */}
          <div className="absolute mt-18 md:mt-24 lg:mt-34 right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 flex flex-row z-10 gap-4 md:gap-6 lg:gap-8">
            <CarouselPrevious className="static w-9 h-6 md:w-12 md:h-8 lg:w-14 lg:h-10 bg-[#aaaaaa] hover:bg-[#888888] shadow-md border-0 transition-all duration-200 flex items-center justify-center text-white text-sm md:text-base lg:text-lg rounded-md transform-none translate-x-0 translate-y-0" />
            <CarouselNext className="static w-9 h-6 md:w-12 md:h-8 lg:w-14 lg:h-10 bg-[#aaaaaa] hover:bg-[#888888] shadow-md border-0 transition-all duration-200 flex items-center justify-center text-white text-sm md:text-base lg:text-lg rounded-md transform-none translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

const CasinoPage = () => {
  const singleGameRedirect = useSingleGameRedirect()
  return (
    <div className="mt-26 mx-3 md:mx-6 lg:mx-8 xl:mx-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">Casino</h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-4 grid-rows-[repeat(2,115px)_140px_115px] md:grid-rows-[repeat(2,180px)_200px_180px] lg:grid-rows-[repeat(2,220px)_240px_220px] gap-3 md:gap-4 lg:gap-6 w-full max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto mt-8">
        {/* Top left large image */}
        <div
          className="col-start-1 col-end-3 row-start-1 row-end-3 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => singleGameRedirect(1980, "Evolution")}
        >
          <Image
            src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66194/Frame-1000008132-500b04e22103026183d1333b7f6a1eff.png"
            alt="Evolution"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Top right two stacked images */}
        <div
          className="col-start-3 col-end-5 row-start-1 row-end-2 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => singleGameRedirect(2003, "Ludo Quick")}
        >
          <Image
            src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66298/Rectangle-5793-a07759081f401f403f599d9d97bbfe8f.png"
            alt="Jack Hammer 4"
            width={400}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="col-start-3 col-end-5 row-start-2 row-end-3 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => singleGameRedirect(1987, "Stock Market")}
        >
          <Image
            src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66202/Red-Tiger-93278ea16008fc244a14bd4183568c80.png"
            alt="Miami Rise"
            width={400}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Middle banner - responsive */}
        <div className="col-start-1 col-end-5 row-start-3 row-end-4 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden relative flex items-center justify-center bg-blue-200">
          <Image
            src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/my-casino-bg.png"
            alt="My Casino Banner"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Responsive Carousels Section */}
      <div className="-mt-25 mb-20 md:mb-24 lg:mb-32">
        <CasinoCarousel title="Live Casino" gameId={2} />
        <CasinoCarousel title="Crash Game" gameId={29} />
        <CasinoCarousel title="Fish Game" gameId={28} />
      </div>
    </div>
  )
}

export default CasinoPage