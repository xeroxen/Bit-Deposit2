"use client"
import Image from "next/image";
import { useGameContext } from '@/lib/gameContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useSingleGameRedirect } from '@/hooks/singGameRedirect';
import React, { useMemo } from 'react';
import { memo } from 'react';

// Reuse GameCard from static-game-carousel
const GameCard = memo(({ cover }: {  cover?: string }) => (
  <div className="relative w-[92px] h-[96px] bg-white rounded-[8px] flex flex-col items-center p-2 overflow-hidden">
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

   
  </div>
));
GameCard.displayName = 'GameCard';

const CasinoCarousel = ({ title, gameId }: { title: string, gameId: number }) => {
  const { games, gameProviders, loading } = useGameContext();
  const singleGameRedirect = useSingleGameRedirect();

  // Get all game IDs for category id 2 (livecasino)
  const liveCasinoGameIds = useMemo(() =>
    gameProviders?.data?.filter(rel => rel.category_id === gameId).map(rel => rel.game_id) || [],
    [gameProviders, gameId]
  );

  // Get all games from all providers
  const allGames = useMemo(() => games?.providers?.flatMap(p => p.games || []) || [], [games]);

  // Filter games for livecasino
  const liveCasinoGames = useMemo(() =>
    allGames.filter(game => liveCasinoGameIds.includes(game.id)),
    [allGames, liveCasinoGameIds]
  );

  if (loading) return null;
  if (!liveCasinoGames.length) return null;

  return (
    <div className="w-full flex flex-col py-4">
      <div className="w-full px-4">
        <h1 className="font-bold text-xl text-start">{title}</h1>
      </div>
      <div className="w-[390px] py-4 relative">
        <Carousel
          opts={{
            align: 'start',
            loop: false,
            dragFree: true,
            containScroll: 'trimSnaps',
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {liveCasinoGames.map(game => (
              <CarouselItem
                key={game.id}
                className="pl-2 md:pl-4 basis-auto cursor-pointer"
                onClick={() => singleGameRedirect(game.id, game.game_name)}
              >
                <GameCard
                  cover={game.cover ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${game.cover}` : undefined}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute mt-18 mr-12 right-2 top-1/2 -translate-y-1/2 flex flex-col z-10">
            <CarouselPrevious className="w-9 h-6 bg-gradient-to-br bg-[#aaaaaa] shadow-md border transition-all duration-200 flex items-center justify-center text-white text-xl rounded-md" />
            <CarouselNext className="w-9 h-6 bg-gradient-to-br bg-[#aaaaaa] shadow-md border transition-all duration-200 flex items-center justify-center text-white text-xl rounded-md" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

const CasinoPage = () => {
    const singleGameRedirect = useSingleGameRedirect();
    return (
        <div className="mt-26 mx-3">
            <h1>Casino</h1>
            <div className="grid grid-cols-4 grid-rows-[repeat(2,115px)_140px_115px] gap-3 w-full max-w-xl mx-auto mt-8">
                {/* Top left large image */}
                <div className="col-start-1 col-end-3 row-start-1 row-end-3 rounded-xl overflow-hidden cursor-pointer" onClick={() => singleGameRedirect(1980, "Evolution")}>
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66194/Frame-1000008132-500b04e22103026183d1333b7f6a1eff.png" alt="Evolution" width={100} height={100} className="object-cover w-full h-full" />
                </div>
                {/* Top right two stacked images */}
                <div className="col-start-3 col-end-5 row-start-1 row-end-2 rounded-xl overflow-hidden cursor-pointer" onClick={() => singleGameRedirect(2003, "Ludo Quick")}>
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66298/Rectangle-5793-a07759081f401f403f599d9d97bbfe8f.png" alt="Jack Hammer 4" width={300} height={151} className="object-cover w-full h-full" />
                </div>
                <div className="col-start-3 col-end-5 row-start-2 row-end-3 rounded-xl overflow-hidden cursor-pointer" onClick={() => singleGameRedirect(1987, "Stock Market")}>
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/05/31/images/66202/Red-Tiger-93278ea16008fc244a14bd4183568c80.png" alt="Miami Rise" width={300} height={151} className="object-cover w-full h-full" />
                </div>
                {/* Middle banner */}
                <div className="col-start-1 col-end-5 row-start-3 row-end-4 rounded-xl overflow-hidden relative flex items-center justify-center bg-blue-200">
                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/my-casino-bg.png" alt="My Casino Banner" fill className="object-cover w-full h-full " />
                </div>
            </div>
            <div className="-mt-25 mb-20">
                <CasinoCarousel title="Live Casino" gameId={2}/>
                <CasinoCarousel title="Crash Game" gameId={29}/>
                <CasinoCarousel title="Fish Game" gameId={28}/>
            </div>
        </div>
    );
};

export default CasinoPage;