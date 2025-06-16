'use client';

import Image from 'next/image';
import React, { useState, useEffect, Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { ApiResponse, CategoryInfo, Game, GameResponse } from '@/types/game.type';
import { useGameContext } from '@/lib/gameContext';
import { useSingleGameRedirect } from "@/hooks/singGameRedirect";

// Game Grid Component
const GameGrid = ({ 
  filteredGames, 
  visibleGames, 
  handleShowMore, 
  onGameClick
}: { 
  filteredGames: Game[], 
  visibleGames: number, 
  handleShowMore: () => void, 
  onGameClick: (game: Game) => void
}) => {
  // Always use 4, 6, or 8 per row based on Tailwind breakpoints
  // Calculate gamesPerRow based on window width (for visibleGames logic only)
  let gamesPerRow = 4;
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1280) {
      gamesPerRow = 8;
    } else if (window.innerWidth >= 1024) {
      gamesPerRow = 6;
    }
  }
  // Divide games into rows for rendering
  const gameRows = [];
  for (let i = 0; i < Math.min(filteredGames.length, visibleGames); i += gamesPerRow) {
    gameRows.push(filteredGames.slice(i, i + gamesPerRow));
  }

  if (filteredGames.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No games found in this category
      </div>
    );
  }

  return (
    <>
      {gameRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-3">
          {row.map(game => (
            <div 
              key={game.id} 
              className="aspect-[3/4] rounded-lg overflow-hidden relative cursor-pointer"
              onClick={() => onGameClick(game)}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 flex flex-col">
                {/* Game image */}
                <div className="flex-1 relative overflow-hidden">
                  {game.cover && (
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${game.cover}`} 
                      alt={game.game_name}
                      fill
                      className="object-fill"
                      sizes="(max-width: 768px) 100vw, 100px"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                </div>
                {/* Game title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                  <div className="text-white text-xs font-bold truncate">{game.game_name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* Show More Button */}
      {filteredGames.length > visibleGames && (
        <div className="text-center mt-4">
          <button 
            onClick={handleShowMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

// Skeleton component for game grid
const GameGridSkeleton = ({ rows = 3 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-[3/4] rounded-lg overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex flex-col">
                {/* Game image skeleton */}
                <div className="flex-1 relative overflow-hidden">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
                {/* Game title skeleton */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/20">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

// Category Pills component
const CategoryPills = ({ 
  categories, 
  selectedCategory, 
  handleCategoryClick 
}: { 
  categories: CategoryInfo[], 
  selectedCategory: number | null, 
  handleCategoryClick: (id: number) => void 
}) => {
  return (
    <>
      {categories.map((category: CategoryInfo) => (
        <div 
          key={category.id} 
          className={`flex items-center ${selectedCategory === category.id ? 'bg-blue-200' : 'bg-gray-200'} rounded-full px-3 py-2 whitespace-nowrap cursor-pointer`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xs">🔥</span>
          </div>
          <span className="text-gray-700 text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </>
  );
};

// Category Pills Skeleton component
const CategoryPillsSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-2 whitespace-nowrap">
          <div className="w-6 h-6 rounded-full mr-2">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </>
  );
};

// Provider Pills component
const ProviderPills = () => {
  return (
    <>
      <div className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-full w-full justify-center">
          <Image
            src="/providers/evolution.png"
            alt="Evolution"
            width={65}
            height={24}
            className="object-contain mr-2"
            style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
            priority
          />
        </div>
      </div>
      <div className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-full w-full justify-center">
          <Image
            src="/providers/spribe.png"
            alt="Spribe"
            width={65}
            height={24}
            className="object-contain mr-2"
            style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
            priority
          />
        </div>
      </div>
      <div className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-full w-full justify-center">
          <Image
            src="/providers/pragmatic_play.png"
            alt="Pragmatic Play"
            width={65}
            height={24}
            className="object-contain mr-2"
            style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
            priority
          />
        </div>
      </div>
      <div className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-full w-full justify-center">
          <Image
            src="/providers/pragmatic.png"
            alt="Pragmatic"
            width={65}
            height={24}
            className="object-contain mr-2"
            style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
            priority
          />
        </div>
      </div>
      <div className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-full w-full justify-center">
          <Image
            src="/providers/pgsoft.png"
            alt="PGSoft"
            width={65}
            height={24}
            className="object-contain mr-2"
            style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
            priority
          />
        </div>
      </div>
      <div className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-full w-full justify-center">
          <Image
            src="/providers/habanero.png"
            alt="Habanero"
            width={65}
            height={24}
            className="object-contain mr-2"
            style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
            priority
          />
        </div>
      </div>
      <div className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-full w-full justify-center">
          <Image
            src="/providers/evoplay.png"
            alt="Evoplay"
            width={65}
            height={24}
            className="object-contain mr-2"
            style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
            priority
          />
        </div>
      </div>
    </>
  );
};

// Provider Pills Skeleton component
const ProviderPillsSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      ))}
    </>
  );
};

// Data fetching component for game grid - will be wrapped in Suspense
const GamesData = ({ 
  visibleGames, 
  handleShowMore, 
  loading,
  filteredGames,
  onGameClick
}: {
  selectedCategory: number | null,
  visibleGames: number,
  handleShowMore: () => void,
  loading: boolean,
  filteredGames: Game[],
  onGameClick: (game: Game) => void
}) => {
  if (loading) {
    return <GameGridSkeleton rows={3} />;
  }

  return (
    <GameGrid 
      filteredGames={filteredGames} 
      visibleGames={visibleGames} 
      handleShowMore={handleShowMore} 
      onGameClick={onGameClick}
    />
  );
};

// Data fetching component for categories - will be wrapped in Suspense
const CategoriesData = ({
  gameProviders,
  selectedCategory,
  handleCategoryClick,
  loading
}: {
  gameProviders: ApiResponse,
  selectedCategory: number | null,
  handleCategoryClick: (id: number) => void,
  loading: boolean
}) => {
  if (loading || !gameProviders.cat?.length) {
    return <CategoryPillsSkeleton />;
  }

  return (
    <CategoryPills 
      categories={gameProviders.cat} 
      selectedCategory={selectedCategory} 
      handleCategoryClick={handleCategoryClick} 
    />
  );
};

// Data fetching component for providers - will be wrapped in Suspense
const ProvidersData = ({
  games,
  loading
}: {
  games: GameResponse,
  loading: boolean
}) => {
  if (loading || !games.providers?.length) {
    return <ProviderPillsSkeleton />;
  }
console.log("games.providers",games.providers);
  return <ProviderPills />;
};

const AllGameMobile = () => {
    const { games, gameProviders, loading } = useGameContext();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [visibleGames, setVisibleGames] = useState<number>(24); // 3 rows of 8 (max per row)
    const [viewAllMode, setViewAllMode] = useState<boolean>(false);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const singleGameRedirect = useSingleGameRedirect();
    
    useEffect(() => {
        // Set first category as default selected when gameProviders loads
        if (gameProviders && gameProviders.cat && gameProviders.cat.length > 0 && selectedCategory === null) {
            setSelectedCategory(gameProviders.cat[0].id);
        }
    }, [gameProviders, selectedCategory]);

    // Filter games by selected category
    useEffect(() => {
        if (viewAllMode) return; // Skip filtering when in "View All" mode
        if (!selectedCategory || !games?.providers || !gameProviders?.data) return;

        // Simulate loading for better UX
        setFilteredGames([]);
        const filterTimer = setTimeout(() => {
            // Get all game IDs for the selected category
            const categoryGameIds = gameProviders.data
                .filter(relation => relation.category_id === selectedCategory)
                .map(relation => relation.game_id);

            // Flatten all games from all providers
            const allGames = games.providers.flatMap(provider => 
                provider.games ? provider.games : []
            );

            // Filter games that belong to selected category
            const gamesInCategory = allGames.filter(game => 
                categoryGameIds.includes(game.id)
            );

            setFilteredGames(gamesInCategory);
            // Reset visible games count when category changes
            setVisibleGames(24); // 3 rows of 8
        }, 500); // Short delay to show loading state
        
        return () => clearTimeout(filterTimer);
    }, [selectedCategory, games, gameProviders, viewAllMode]);

    useEffect(() => {
        // Set allGames for viewAllMode
        if (games?.providers) {
            const extractedGames = games.providers.flatMap(provider => 
                provider.games ? provider.games : []
            );
            setAllGames(extractedGames);
        }
    }, [games]);

    const handleCategoryClick = (categoryId: number) => {
        if (viewAllMode) {
            setViewAllMode(false);
        }
        if (selectedCategory === categoryId) return;
        setSelectedCategory(categoryId);
    };

    const handleShowMore = () => {
        // Always add a full row (8) for consistency with grid-cols-8
        setVisibleGames(prevVisible => prevVisible + 8);
    };

    const handleGameClick = (game: Game) => {
        singleGameRedirect(game.id, game.game_name);
    };
    
    const handleViewAll = () => {
        setViewAllMode(true);
        setVisibleGames(24); // Reset to initial 3 rows of 8
    };

    // Determine which games to display based on mode
    const displayGames = viewAllMode ? allGames : filteredGames;

    return (
        <div className="w-full bg-gray-100 p-4">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">All Games</h2>
                <div 
                    className="bg-blue-100 px-3 py-1 rounded-bl-lg cursor-pointer hover:bg-blue-200"
                    onClick={handleViewAll}
                >
                    <span className="text-blue-800 text-sm font-medium">View All</span>
                </div>
            </div>

            {/* Category Pills - Hide when in View All mode */}
            {!viewAllMode && (
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    <Suspense fallback={<CategoryPillsSkeleton />}>
                        <CategoriesData 
                            gameProviders={gameProviders || { status: false, message: '', data: [], cat: [] }}
                            selectedCategory={selectedCategory}
                            handleCategoryClick={handleCategoryClick}
                            loading={loading}
                        />
                    </Suspense>
                </div>
            )}
            
            {/* View Mode Indicator */}
            {viewAllMode && (
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Viewing All Games</h3>
                    <button 
                        onClick={() => setViewAllMode(false)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Back to Categories
                    </button>
                </div>
            )}

            {/* Game Rows */}
            <div className="mb-6">
                <Suspense fallback={<GameGridSkeleton rows={3} />}>
                    <GamesData 
                        selectedCategory={selectedCategory}
                        visibleGames={visibleGames}
                        handleShowMore={handleShowMore}
                        loading={loading}
                        filteredGames={displayGames}
                        onGameClick={handleGameClick}
                    />
                </Suspense>
            </div>

            {/* Providers Section - Hide when in View All mode */}
            {!viewAllMode && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Providers</h3>
                    
                    <div className="grid grid-cols-4 gap-2">
                        <Suspense fallback={<ProviderPillsSkeleton />}>
                            <ProvidersData 
                                games={games || { providers: [] }}
                                loading={loading}
                            />
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllGameMobile;