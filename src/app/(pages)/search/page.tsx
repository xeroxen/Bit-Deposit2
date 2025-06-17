"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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
    <div className="max-w-3xl mx-auto py-8 px-4 mt-20">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => singleGameRedirect(game.id, game.game_name)}
            >
              <CardHeader>
                <CardTitle className="truncate">{game.game_name}</CardTitle>
                <CardDescription>{game.provider?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {game.cover ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${game.cover}`}
                    alt={game.game_name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-full h-32 bg-muted rounded-md mb-2 flex items-center justify-center text-xs text-muted-foreground">No image</div>
                )}
              </CardContent>
            </Card>
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