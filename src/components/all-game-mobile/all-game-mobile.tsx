import React, { useState, useEffect } from 'react';
// Type for individual category-game relationships in the 'data' array
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
    code: "PGSOFT" | "PRAGMATIC" | "EVOPLAY" | "HABANERO";
    name: "PGSoft" | "Pragmatic Play" | "EvoPlay" | "Habanero";
    status: number;
    rtp: number;
    views: number;
    distribution: "worldslot" | "play_fiver";
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  }
  
  interface Game {
    id: number;
    provider_id: number;
    game_server_url: string | null;
    game_id: string;
    game_name: string;
    game_code: string;
    game_type: "slots";
    description: string | null;
    cover: string;
    status: "1";
    technology: "html5";
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
  type GameResponse = Game[];



const AllGameMobile = () => {



const [games, setGames] = useState<GameResponse>({} as GameResponse);
const [gameProviders, setGameProviders] = useState<ApiResponse>({} as ApiResponse);

async function getGames() {
    const response  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/all`);
    const data: GameResponse = await response.json();
    setGames(data);
}
async function getGameProviders() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game-cat`);
    const data: ApiResponse = await response.json();
    setGameProviders(data);
}



useEffect(() => {
    getGames();
    getGameProviders();
}, []);






















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
                {/* Hot Games Pill */}
                {gameProviders.cat && gameProviders.cat.map((provider: CategoryInfo) => (
                    <div key={provider.id} className="flex items-center bg-gray-200 rounded-full px-3 py-2 whitespace-nowrap">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs">🔥</span>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{provider.name}</span>
                    </div>
                ))}
            </div>

            {/* Game Cards Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6">
                {/* Game Card 1 - Crazy Time */}
                <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
                    <div className="w-full h-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 flex flex-col">
                        {/* Game character/image area */}
                        <div className="flex-1 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                            {/* Simulated character silhouette */}
                            <div className="absolute bottom-2 left-2 right-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full mb-1"></div>
                                <div className="w-full h-2 bg-white/10 rounded"></div>
                            </div>
                        </div>
                        {/* Game title */}
                        <div className="p-2 text-center">
                            <div className="text-white text-xs font-bold">Crazy Time</div>
                        </div>
                    </div>
                </div>

               
            </div>

            {/* Providers Section */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Providers</h3>
                
                {/* Provider Pills - First Row */}
                <div className="flex gap-2 mb-2">
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 1</span>
                    </div>
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 2</span>
                    </div>
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 3</span>
                    </div>
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 4</span>
                    </div>
                </div>

                {/* Provider Pills - Second Row */}
                <div className="flex gap-2">
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 5</span>
                    </div>
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 6</span>
                    </div>
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 7</span>
                    </div>
                    <div className="flex-1 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Provider 8</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllGameMobile;