export interface SingleGameResponse {
    gameUrl: string;
    // Add other fields as needed
} 

// Add interface for error response
export interface ErrorResponse {
    error: string;
    status: boolean;
}

// Type for individual category-game relationships in the 'data' array
interface CategoryGameRelationship {
    category_id: number;
    game_id: number;
  }
  
  // Type for category information in the 'cat' array
  export interface CategoryInfo {
    id: number;
    name: string;
    description: string;
    image: string;
    slug: string;
    created_at: string;  // Format: "YYYY-MM-DD HH:MM:SS"
    updated_at: string;  // Format: "YYYY-MM-DD HH:MM:SS"
  }
  
  // Main API response structure
  export interface ApiResponse {
    status: boolean;
    message: string;
    data: CategoryGameRelationship[];  // Array of category-game relationships
    cat: CategoryInfo[];              // Array of category metadata
  }

  export interface GameProvider {
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
  
  export interface Game {
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
  export interface GameResponse {
    providers: GameProvider[];
  }

  // Provider API Response Type
  export interface ProviderApiResponse {
    success: boolean;
    provider: Provider[];
  }

  export interface Provider {
    id: number;
    cover: string | null;
    code: string;
    name: string;
    status: number;
    rtp: number;
    views: number;
    distribution: string;
    image: string;
    created_at: string;
    updated_at: string;
  }