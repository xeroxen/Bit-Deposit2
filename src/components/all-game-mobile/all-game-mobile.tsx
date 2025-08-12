'use client';

import Image from 'next/image';
import React, { useState, useEffect, Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { ApiResponse, CategoryInfo, Game, ProviderApiResponse, Provider } from '@/types/game.type';
import { useGameContext } from '@/lib/gameContext';
import { useSingleGameRedirect } from "@/hooks/singGameRedirect";
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { addFavourite } from '@/hooks/addFavourite';

// Game Grid Component
const GameGrid = ({ 
  filteredGames, 
  visibleGames, 
  handleShowMore, 
  onGameClick,
  clickedGameId,
  favoriteLoading,
  setFavoriteLoading
}: { 
  filteredGames: Game[], 
  visibleGames: number, 
  handleShowMore: () => void, 
  onGameClick: (game: Game) => void,
  clickedGameId: number | null,
  favoriteLoading: number | null,
  setFavoriteLoading: (id: number | null) => void
}) => {
  // Always use 3, 6, or 8 per row based on Tailwind breakpoints
  // Calculate gamesPerRow based on window width (for visibleGames logic only)
  let gamesPerRow = 3;
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
        <div key={rowIndex} className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-3">
          {row.map(game => (
            <div 
              key={game.id} 
              className={`aspect-[3/3.8] rounded-lg overflow-hidden relative cursor-pointer group transition-all duration-200 ${
                clickedGameId === game.id 
                  ? 'opacity-50 scale-95 pointer-events-none' 
                  : 'hover:scale-105'
              }`}
              onClick={() => onGameClick(game)}
            >
              {/* Favorite Icon */}
              <button
                type="button"
                className={`absolute top-2 right-2 z-10 p-1 bg-white/80 rounded-full shadow transition-colors ${
                  favoriteLoading === game.id 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'hover:bg-red-100 cursor-pointer'
                }`}
                onClick={e => {
                  e.stopPropagation(); // Prevent triggering game click
                  if (favoriteLoading === game.id) return; // Prevent multiple clicks
                  
                  setFavoriteLoading(game.id);
                  addFavourite(game).finally(() => {
                    setFavoriteLoading(null);
                  });
                }}
                aria-label="Add to favorites"
                disabled={favoriteLoading === game.id}
              >
                <Heart className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-red-500 group-hover:text-red-600" strokeWidth={2} />
              </button>
              {/* End Favorite Icon */}
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 flex flex-col">
                <div className="flex-1 relative overflow-hidden">
                  {game.cover && (
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/game/${game.cover}`} 
                      alt={game.game_name}
                      fill
                      className="object-fill"
                      sizes="(max-width: 768px) 100vw, 100px"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                </div>
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
  // Calculate skeleton items per row based on screen size
  const getSkeletonItemsPerRow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 8; // xl: 8 per row
      if (window.innerWidth >= 1024) return 6; // lg: 6 per row
      return 3; // mobile: 3 per row
    }
    return 3; // default to mobile
  };

  const skeletonItemsPerRow = getSkeletonItemsPerRow();

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-3">
          {Array.from({ length: skeletonItemsPerRow }).map((_, index) => (
            <div key={index} className="aspect-[3/3.8] rounded-lg overflow-hidden relative">
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
const ProviderPills = ({ providers, onProviderClick }: { providers: Provider[], onProviderClick: (id: number) => void }) => {

  return (
    <>
      {providers.map((provider) => (
        <div key={provider.id} className="h-9 md:h-12 lg:h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 px-2 md:px-4 lg:px-6">
          <div className="flex items-center h-full w-full justify-center cursor-pointer" onClick={() => onProviderClick(provider.id)}>
            {provider.image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${provider.image}`}
                alt={provider.name}
                width={65}
                height={24}
                className="object-contain mr-2"
                style={{ width: '80%', height: '80%', maxWidth: '80%', maxHeight: '80%' }}
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 120px, 160px"
                priority
              />
            ) : (
              <span className="text-gray-700 text-sm font-medium">{provider.name}</span>
            )}
          </div>
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
  loading,
  filteredGames,
  onGameClick,
  clickedGameId,
  favoriteLoading,
  setFavoriteLoading
}: {
  visibleGames: number,
  handleShowMore: () => void,
  loading: boolean,
  filteredGames: Game[],
  onGameClick: (game: Game) => void,
  clickedGameId: number | null,
  favoriteLoading: number | null,
  setFavoriteLoading: (id: number | null) => void
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
      clickedGameId={clickedGameId}
      favoriteLoading={favoriteLoading}
      setFavoriteLoading={setFavoriteLoading}
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
  providers,
  loading,
  visibleProviders,
  onProviderClick
}: {
  providers: Provider[],
  loading: boolean,
  visibleProviders: number,
  onProviderClick: (id: number) => void
}) => {
  if (loading || !providers?.length) {
    return <ProviderPillsSkeleton />;
  }
  return <ProviderPills providers={providers.slice(0, visibleProviders)} onProviderClick={onProviderClick} />;
};

const AllGameMobile = () => {
    const { games, gameProviders, loading } = useGameContext();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [visibleGames, setVisibleGames] = useState<number>(9); // 3 rows of 3 (mobile default)
    const [viewAllMode, setViewAllMode] = useState<boolean>(false);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [providersLoading, setProvidersLoading] = useState<boolean>(true);
    const [visibleProviders, setVisibleProviders] = useState<number>(8);
    const [clickedGameId, setClickedGameId] = useState<number | null>(null);
    const [favoriteLoading, setFavoriteLoading] = useState<number | null>(null);
    const singleGameRedirect = useSingleGameRedirect();
    const router = useRouter();
    
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
            setVisibleGames(9); // 3 rows of 3 (mobile default)
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
    }, [games, viewAllMode]);

    // Fetch providers from API
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setProvidersLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-provider`);
                const data: ProviderApiResponse = await response.json();
                
                if (data.success && data.provider) {
                    setProviders(data.provider);
                }
            } catch (error) {
                console.error('Error fetching providers:', error);
            } finally {
                setProvidersLoading(false);
            }
        };

        fetchProviders();
    }, []);

    const handleCategoryClick = (categoryId: number) => {
        if (viewAllMode) {
            setViewAllMode(false);
        }
        if (selectedCategory === categoryId) return;
        setSelectedCategory(categoryId);
    };

    const handleShowMore = () => {
        // Add a full row based on screen size
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1280) {
                setVisibleGames(prevVisible => prevVisible + 8); // xl: 8 per row
            } else if (window.innerWidth >= 1024) {
                setVisibleGames(prevVisible => prevVisible + 6); // lg: 6 per row
            } else {
                setVisibleGames(prevVisible => prevVisible + 3); // mobile: 3 per row
            }
        } else {
            setVisibleGames(prevVisible => prevVisible + 3); // default to mobile
        }
    };

    const handleGameClick = (game: Game) => {
        // Prevent multiple clicks on the same game
        if (clickedGameId === game.id) {
            return;
        }
        
        setClickedGameId(game.id);
        singleGameRedirect(game.id, game.game_name);
        
        // Reset clicked game ID after a delay to allow for new clicks
        setTimeout(() => {
            setClickedGameId(null);
        }, 2000);
    };
    
    const handleViewAll = () => {
        setViewAllMode(true);
        setVisibleGames(9); // Reset to initial 3 rows of 3 (mobile default)
    };

    const handleShowMoreProviders = () => {
        setVisibleProviders(prev => prev + 8);
    };

    const handleProviderClick = (providerId: number) => {
        router.push(`/search?provider=${providerId}`);
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
                        visibleGames={visibleGames}
                        handleShowMore={handleShowMore}
                        loading={loading}
                        filteredGames={displayGames}
                        onGameClick={handleGameClick}
                        clickedGameId={clickedGameId}
                        favoriteLoading={favoriteLoading}
                        setFavoriteLoading={setFavoriteLoading}
                    />
                </Suspense>
            </div>

            {/* Providers Section - Hide when in View All mode */}
            {!viewAllMode && (
                <div className="mb-4">
                    <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-3 ml-5">Providers</h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 w-[95vw] mx-auto">
                        <Suspense fallback={<ProviderPillsSkeleton />}>
                            <ProvidersData 
                                providers={providers}
                                loading={providersLoading}
                                visibleProviders={visibleProviders}
                                onProviderClick={handleProviderClick}
                            />
                        </Suspense>
                    </div>
                    {providers.length > visibleProviders && (
                        <div className="text-center mt-4">
                            <button 
                                onClick={handleShowMoreProviders}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                            >
                                Show More Providers
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllGameMobile;