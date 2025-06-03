import Image from 'next/image';
import React, { useState, useEffect } from 'react';
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

const AllGameMobile = () => {
    const [games, setGames] = useState<GameResponse>({ providers: [] });
    const [gameProviders, setGameProviders] = useState<ApiResponse>({ status: false, message: '', data: [], cat: [] });
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);

    async function getGames() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/all`);
            const data: GameResponse = await response.json();
            setGames(data);
        } catch (error) {
            console.error("Error fetching games:", error);
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
    }, [selectedCategory, games, gameProviders]);

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId);
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
                {gameProviders.cat && gameProviders.cat.map((category: CategoryInfo) => (
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
            </div>

            {/* Game Cards Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6">
                {filteredGames.length > 0 ? (
                    filteredGames.map(game => (
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
                                {/* Game title */}
                                {/* <div className="p-2 text-center">
                                    <div className="text-white text-xs font-bold">{game.game_name}</div>
                                </div> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-4 text-center py-4 text-gray-500">
                        No games found in this category
                    </div>
                )}
            </div>

            {/* Providers Section */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Providers</h3>
                
                <div className="grid grid-cols-4 gap-2">
                    {games.providers && games.providers.map((provider) => (
                        <div key={provider.id} className="h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                            <span className="text-xs text-gray-600 font-medium truncate px-2">{provider.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllGameMobile;