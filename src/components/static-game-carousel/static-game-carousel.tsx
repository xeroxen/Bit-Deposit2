"use client";

import React, { useMemo, memo } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useGameContext } from '@/lib/gameContext';
import { Skeleton } from "@/components/ui/skeleton";
import { useSingleGameRedirect } from "@/hooks/singGameRedirect";
import { Game } from "@/types/game.type";

interface GameCardProps {
  name: string;
  winAmount: string;
  cover?: string;
}

// Memoized GameCard for performance
const GameCard: React.FC<GameCardProps> = memo(({ name, winAmount, cover }) => {
  return (
    <div className="relative w-[92px] h-[96px] md:w-[120px] md:h-[128px] lg:w-[140px] lg:h-[150px] xl:w-[260px] xl:h-[270px] bg-white rounded-[8px] flex flex-col items-center p-2 overflow-hidden">
      {/* Full card background image */}
      {cover && (
        <div
          className="absolute inset-0 w-full h-full bg-gray-200"
          style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      )}
      {!cover && (
        <div className="absolute inset-0 w-full h-full bg-gray-200" style={{ zIndex: 0 }} />
      )}
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full h-full justify-between">
        <div className="w-full mt-3 mb-1 px-1">
          <div className="font-inter font-semibold text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] leading-[16px] text-[#ffffff] capitalize text-center truncate w-full overflow-hidden whitespace-nowrap  rounded">
            {name}
          </div>
        </div>
        <div className="font-inter font-medium text-[9px] md:text-[12px] lg:text-[14px] xl:text-[24px] leading-[14px] text-[#ffe600] text-center mb-2  rounded px-1">
          win {winAmount}
        </div>
        <div className="w-[74px] h-[24px] md:w-[100px] md:h-[32px] lg:w-[120px] lg:h-[36px] xl:w-[140px] xl:h-[40px] mb-2 bg-gradient-to-b from-[#97EB0E] to-[#19B90B] shadow-[0px_4px_8px_-2px_rgba(118,188,4,0.32)] rounded-[8px] flex items-center justify-center">
          <span className="font-inter font-semibold text-[12px] leading-[14px] text-white">
            Play Now
          </span>
        </div>
      </div>
    </div>
  );
});
GameCard.displayName = "GameCard";

// Skeleton for the carousel card
const GameCardSkeleton = () => (
  <div className="relative w-[92px] h-[96px] bg-white rounded-[8px] flex flex-col items-center p-2 overflow-hidden">
    {/* Image skeleton */}
    <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse z-0" />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60 z-10" />
    {/* Content skeletons */}
    <div className="relative z-20 flex flex-col items-center w-full h-full justify-between">
      <div className="w-full mt-3 mb-1 px-1">
        <Skeleton className="h-4 w-full rounded" />
      </div>
      <div className="font-inter font-medium text-[9px] leading-[14px] text-[#ffe600] text-center mb-2 rounded px-1 w-full flex justify-center">
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>
      <div className="w-[74px] h-[24px] mb-2 bg-gradient-to-b from-[#97EB0E] to-[#19B90B] shadow-[0px_4px_8px_-2px_rgba(118,188,4,0.32)] rounded-[8px] flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-[8px]" />
      </div>
    </div>
  </div>
);

const StaticGameCarousel = () => {
  const { games, loading } = useGameContext();
  const singleGameRedirect = useSingleGameRedirect();

  // Memoize allGames to avoid recalculating on every render
  const allGames = useMemo(() => games?.providers?.flatMap(provider => provider.games || []) || [], [games]);

  // Memoize carousel items to avoid unnecessary re-renders
  const carouselItems = useMemo(() =>
    allGames.map((game: Game) => (
      <CarouselItem key={game.id} className="pl-2 md:pl-4 basis-auto cursor-pointer" onClick={() => singleGameRedirect(game.id, game.game_name)}>
        <GameCard
          name={game.game_name}
          winAmount={game.rtp ? `${game.rtp}x` : ''}
          cover={game.cover ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${game.cover}` : undefined}
        />
      </CarouselItem>
    ))
  , [allGames, singleGameRedirect]);

  // Show skeletons while loading or no games
  if (loading || allGames.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-4">
        <div className="w-[90vw]  py-4 relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
              containScroll: "trimSnaps",
              slidesToScroll: 1
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <CarouselItem key={idx} className="pl-2 md:pl-4 basis-auto cursor-pointer">
                  <GameCardSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute mt-18 mr-12 right-2 top-1/2 -translate-y-1/2 flex flex-col  z-10">
            <CarouselPrevious
              className="w-9 h-6 bg-gradient-to-br bg-[#aaaaaa] shadow-md border transition-all duration-200 flex items-center justify-center text-white text-xl rounded-md"
            />
            <CarouselNext
              className="w-9 h-6 bg-gradient-to-br bg-[#aaaaaa] shadow-md border  transition-all duration-200 flex items-center justify-center text-white text-xl rounded-md"
            />
          </div>
          </Carousel>
         
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center py-4">
      <div className="w-[90vw] py-4 relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
            containScroll: "trimSnaps",
            slidesToScroll: 1
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {carouselItems}
          </CarouselContent>
          <div className="absolute mt-18 mr-12 right-2 top-1/2 -translate-y-1/2 flex flex-col  z-10">
            <CarouselPrevious
              className="w-9 h-6 bg-gradient-to-br bg-[#aaaaaa] shadow-md border transition-all duration-200 flex items-center justify-center text-white text-xl rounded-md"
            />
            <CarouselNext
              className="w-9 h-6 bg-gradient-to-br bg-[#aaaaaa] shadow-md border  transition-all duration-200 flex items-center justify-center text-white text-xl rounded-md"
            />
          </div>
        </Carousel>
        
      </div>
    </div>
  );
};

export default StaticGameCarousel;