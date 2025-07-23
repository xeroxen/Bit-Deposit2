"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useGameContext } from "@/lib/gameContext";
import { useSingleGameRedirect } from "@/hooks/singGameRedirect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { addFavourite } from "@/hooks/addFavourite";
import { Heart } from "lucide-react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { games, loading } = useGameContext();
  const [search, setSearch] = useState<string>("");
  const singleGameRedirect = useSingleGameRedirect();
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined);

  // Sync search state with URL
  useEffect(() => {
    const urlSearch = searchParams.get("q") || "";
    setSearch(urlSearch);
    const urlProvider = searchParams.get("provider") || undefined;
    setSelectedProvider(urlProvider);
  }, [searchParams]);

  // Update URL when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    if (selectedProvider) {
      params.set("provider", selectedProvider);
    } else {
      params.delete("provider");
    }
    router.replace(`?${params.toString()}`);
  };

  // Flatten all games
  const allGames = useMemo(() => {
    if (!games?.providers) return [];
    return games.providers.flatMap((provider) => provider.games || []);
  }, [games]);

  // Get all unique providers
  const allProviders = useMemo(() => {
    if (!games?.providers) return [];
    return games.providers.map((provider) => ({
      id: provider.id,
      name: provider.name,
    }));
  }, [games]);

  // Filter games by search and provider
  const filteredGames = useMemo(() => {
    let result = allGames;
    if (search) {
      result = result.filter((game) =>
        game.game_name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedProvider) {
      result = result.filter((game) =>
        String(game.provider_id) === selectedProvider
      );
    }
    return result;
  }, [allGames, search, selectedProvider]);

  return (
    <div className="max-w-[95vw] mx-auto py-8 px-4 mt-20">
      <h1 className="text-2xl font-bold mb-6">Search Games</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Search for a game..."
          value={search}
          onChange={handleSearchChange}
          className="max-w-lg w-full"
        />
        <Select
          value={selectedProvider}
          onValueChange={(val) => {
            setSelectedProvider(val || undefined);
            const params = new URLSearchParams(Array.from(searchParams.entries()));
            if (val) {
              params.set("provider", val);
            } else {
              params.delete("provider");
            }
            if (search) {
              params.set("q", search);
            } else {
              params.delete("q");
            }
            router.replace(`?${params.toString()}`);
          }}
        >
          <SelectTrigger className="max-w-lg w-full">
            <SelectValue placeholder="All Providers" />
          </SelectTrigger>
          <SelectContent>
            {allProviders.map((provider) => (
              <SelectItem key={provider.id} value={String(provider.id)}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading games...</div>
      ) : filteredGames.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">No games found.</div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-3">
          {filteredGames.map((game) => (
            <div 
              key={game.id} 
              className="aspect-[3/4] rounded-lg overflow-hidden relative cursor-pointer"
              onClick={() => singleGameRedirect(game.id, game.game_name)}
            >
              {/* Favorite Icon */}
              <button
                type="button"
                className="absolute top-2 right-2 z-10 p-1 bg-white/80 rounded-full shadow hover:bg-red-100 transition-colors cursor-pointer"
                onClick={e => {
                  e.stopPropagation(); // Prevent triggering game click
                  addFavourite(game);
                }}
                aria-label="Add to favorites"
              >
                <Heart className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-red-500 group-hover:text-red-600" strokeWidth={2} />
              </button>
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 flex flex-col">
                {/* Game image */}
                <div className="flex-1 relative overflow-hidden">
                  {game.cover ? (
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/game/${game.cover}`} 
                      alt={game.game_name}
                      fill
                      className="object-fill"
                      sizes="(max-width: 768px) 100vw, 100px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">No image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                </div>
                {/* Game title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                  <div className="text-white text-xs font-bold truncate">{game.game_name}</div>
                  {game.provider?.name && (
                    <div className="text-white text-xs opacity-75 truncate">{game.provider.name}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}