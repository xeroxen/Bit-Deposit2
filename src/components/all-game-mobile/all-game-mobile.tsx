'use client';

import Image from 'next/image';
import React, { useState, useEffect, Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
// Type for individual category-game relationships in the 'data' array
interface CategoryGameRelationship {
    category_id: number;
    game_id: number;
  }
  
  // Type for category information in the 'cat' array
  interface CategoryInfo {
    id: number;
    name: string;
    description: string;
    image: string;
    slug: string;
    created_at: string;  // Format: "YYYY-MM-DD HH:MM:SS"
    updated_at: string;  // Format: "YYYY-MM-DD HH:MM:SS"
  }
  
  // Main API response structure
  interface ApiResponse {
    status: boolean;
    message: string;
    data: CategoryGameRelationship[];  // Array of category-game relationships
    cat: CategoryInfo[];              // Array of category metadata
  }

  interface GameProvider {
    id: number;
    cover: string | null;
    code: string;
    name: string;
    status: number;
    rtp: number;
    views: number;
    distribution: "worldslot" | "play_fiver";
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    games?: Game[]; // Optional games array
  }
  
  interface Game {
    id: number;
    provider_id: number;
    game_server_url: string | null;
    game_id: string;
    game_name: string;
    game_code: string;
    game_type: string;
    description: string | null;
    cover: string;
    status: string;
    technology: string;
    has_lobby: 0 | 1;
    is_mobile: 0 | 1;
    has_freespins: 0 | 1;
    has_tables: 0 | 1;
    only_demo: 0 | 1;
    rtp: number;
    distribution: "worldslot" | "play_fiver";
    views: number;
    is_featured: 0 | 1;
    show_home: 1;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    hasFavorite: boolean;
    totalFavorites: number;
    hasLike: boolean;
    totalLikes: number;
    dateHumanReadable: string;
    createdAt: string; // ISO 8601 date string
    provider: GameProvider;
  }
  
  // Response Type
  interface GameResponse {
    providers: GameProvider[];
  }

// Game Grid Component
const GameGrid = ({ 
  filteredGames, 
  visibleGames, 
  handleShowMore, 
  gamesPerRow 
}: { 
  filteredGames: Game[], 
  visibleGames: number, 
  handleShowMore: () => void, 
  gamesPerRow: number 
}) => {
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
        <div key={rowIndex} className="grid grid-cols-4 gap-2 mb-3">
          {row.map(game => (
            <div key={game.id} className="aspect-[3/4] rounded-lg overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 flex flex-col">
                {/* Game image */}
                <div className="flex-1 relative overflow-hidden">
                  {game.cover && (
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${game.cover}`} 
                      alt={game.game_name}
                      className="absolute inset-0 w-full h-full object-cover"
                      width={100}
                      height={100}
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
const GameGridSkeleton = ({ rows = 3, gamesPerRow = 4 }: { rows?: number, gamesPerRow?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-2 mb-3">
          {Array.from({ length: gamesPerRow }).map((_, index) => (
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
const ProviderPills = ({ providers }: { providers: GameProvider[] }) => {
  return (
    <>
      {providers.map((provider) => (
        <div key={provider.id} className="h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
          <span className="text-xs text-gray-600 font-medium truncate px-2">{provider.name}</span>
        </div>
      ))}
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
  gamesPerRow,
  loading,
  filteredGames
}: {
  selectedCategory: number | null,
  visibleGames: number,
  handleShowMore: () => void,
  gamesPerRow: number,
  loading: boolean,
  filteredGames: Game[]
}) => {
  if (loading) {
    return <GameGridSkeleton rows={3} gamesPerRow={gamesPerRow} />;
  }

  return (
    <GameGrid 
      filteredGames={filteredGames} 
      visibleGames={visibleGames} 
      handleShowMore={handleShowMore} 
      gamesPerRow={gamesPerRow}
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

  return <ProviderPills providers={games.providers} />;
};

const AllGameMobile = () => {
    const [games, setGames] = useState<GameResponse>({ providers: [] });
    const [gameProviders, setGameProviders] = useState<ApiResponse>({ status: false, message: '', data: [], cat: [] });
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [visibleGames, setVisibleGames] = useState<number>(12); // Initial 3 rows of 4 games
    const [loading, setLoading] = useState<boolean>(true);
    const gamesPerRow = 4;
    const initialRows = 3;

    async function getGames() {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/all`);
            const data: GameResponse = await response.json();
            setGames(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching games:", error);
            setLoading(false);
        }
    }

    async function getGameProviders() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game-cat`);
            const data: ApiResponse = await response.json();
            setGameProviders(data);
            // Set first category as default selected
            if (data.cat && data.cat.length > 0) {
                setSelectedCategory(data.cat[0].id);
            }
        } catch (error) {
            console.error("Error fetching game categories:", error);
        }
    }

    useEffect(() => {
        getGames();
        getGameProviders();
    }, []);

    // Filter games by selected category
    useEffect(() => {
        if (!selectedCategory || !games.providers || !gameProviders.data) return;

        setLoading(true);
        
        // Simulate loading for better UX
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
            setVisibleGames(initialRows * gamesPerRow);
            setLoading(false);
        }, 500); // Short delay to show loading state
        
        return () => clearTimeout(filterTimer);
    }, [selectedCategory, games, gameProviders]);

    const handleCategoryClick = (categoryId: number) => {
        if (selectedCategory === categoryId) return;
        setSelectedCategory(categoryId);
    };

    const handleShowMore = () => {
        setVisibleGames(prevVisible => prevVisible + (3 * gamesPerRow)); // Show 3 more rows
    };

    return (
        <div className="w-full bg-gray-100 p-4">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">All Games</h2>
                <div className="bg-blue-100 px-3 py-1 rounded-bl-lg">
                    <span className="text-blue-800 text-sm font-medium">View All</span>
                </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                <Suspense fallback={<CategoryPillsSkeleton />}>
                    <CategoriesData 
                        gameProviders={gameProviders}
                        selectedCategory={selectedCategory}
                        handleCategoryClick={handleCategoryClick}
                        loading={loading}
                    />
                </Suspense>
            </div>

            {/* Game Rows */}
            <div className="mb-6">
                <Suspense fallback={<GameGridSkeleton rows={initialRows} gamesPerRow={gamesPerRow} />}>
                    <GamesData 
                        selectedCategory={selectedCategory}
                        visibleGames={visibleGames}
                        handleShowMore={handleShowMore}
                        gamesPerRow={gamesPerRow}
                        loading={loading}
                        filteredGames={filteredGames}
                    />
                </Suspense>
            </div>

            {/* Providers Section */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Providers</h3>
                
                <div className="grid grid-cols-4 gap-2">
                    <Suspense fallback={<ProviderPillsSkeleton />}>
                        <ProvidersData 
                            games={games}
                            loading={loading}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default AllGameMobile;