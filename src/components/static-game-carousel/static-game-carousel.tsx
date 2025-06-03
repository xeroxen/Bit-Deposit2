"use client";

import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

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
    <div className="relative w-[92px] h-[96px] bg-white rounded-[8px] shadow-md">
      {/* Game title */}
      <div className="absolute w-[29.35px] h-[16px] left-[31.5px] top-[22.86px] font-inter font-semibold text-[12px] leading-[16px] flex items-center text-[#1D3D68] capitalize">
        {name}
      </div>
      
      {/* Win amount */}
      <div className="absolute w-[45.12px] h-[14.14px] left-[23.61px] top-[38.86px] font-inter font-medium text-[9px] leading-[14px] flex items-center text-[#F17910]">
        win {winAmount}
      </div>
      
      {/* Play now button */}
      <div className="absolute w-[74px] h-[24px] left-[calc(50%-74px/2)] bottom-[11px] bg-gradient-to-b from-[#97EB0E] to-[#19B90B] shadow-[0px_18px_8px_-8px_rgba(118,188,4,0.32)] rounded-[8px] flex items-center justify-center">
        <span className="absolute w-[57.94px] h-[15px] left-[calc(50%-57.94px/2+0.19px)] top-[2px] font-inter font-semibold text-[12.8px] leading-[19px] flex items-center justify-center text-white">
          Play Now
        </span>
      </div>
    </div>
  );
};

const StaticGameCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    return () => {
      api.off("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    };
  }, [api]);

  return (
    <div className="w-full py-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps"
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