"use client";

import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

// Game data for the carousel
const games = [
  { id: 1, name: "Slots", winAmount: "5250x" },
  { id: 2, name: "Poker", winAmount: "4150x" },
  { id: 3, name: "Blackjack", winAmount: "3200x" },
  { id: 4, name: "Roulette", winAmount: "6000x" },
  { id: 5, name: "Baccarat", winAmount: "4800x" },
  { id: 6, name: "Craps", winAmount: "3900x" },
];

interface GameCardProps {
  name: string;
  winAmount: string;
}

const GameCard: React.FC<GameCardProps> = ({ name, winAmount }) => {
  return (
    <div className="relative w-[92px] h-[96px] bg-white rounded-[8px] shadow-md flex flex-col items-center justify-between p-2">
      {/* Game title */}
      <div className="font-inter font-semibold text-[12px] leading-[16px] text-[#1D3D68] capitalize text-center mt-3">
        {name}
      </div>
      
      {/* Win amount */}
      <div className="font-inter font-medium text-[9px] leading-[14px] text-[#F17910] text-center -mt-1">
        win {winAmount}
      </div>
      
      {/* Play now button */}
      <div className="w-[74px] h-[24px] mb-1 bg-gradient-to-b from-[#97EB0E] to-[#19B90B] shadow-[0px_4px_8px_-2px_rgba(118,188,4,0.32)] rounded-[8px] flex items-center justify-center">
        <span className="font-inter font-semibold text-[12px] leading-[14px] text-white">
          Play Now
        </span>
      </div>
    </div>
  );
};

const StaticGameCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    
    return () => {
      // Clean up event listeners if needed
    };
  }, [api]);

  return (
    <div className="w-full py-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
          containScroll: "trimSnaps",
          slidesToScroll: 1
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {games.map((game) => (
            <CarouselItem key={game.id} className="pl-2 md:pl-4 basis-auto">
              <GameCard name={game.name} winAmount={game.winAmount} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default StaticGameCarousel;