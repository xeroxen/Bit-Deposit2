"use client"
import { getAuthToken } from '@/lib/authentication';
import { useGameContext } from '@/lib/gameContext';
import React, { useEffect } from 'react';
import { useSingleGameRedirect } from '@/hooks/singGameRedirect';
import Image from 'next/image';
import { useState } from 'react';
import { Loader2 } from "lucide-react";

const FavouritePage = () => {
    const { games } = useGameContext();
    const singleGameRedirect = useSingleGameRedirect();
    const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const getFavouritesGames = async () => {
        setLoading(true);
        const token = getAuthToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-favarate`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (data && data.status && Array.isArray(data.f)) {
            setFavouriteIds(data.f.map((fav: { game_id: number }) => fav.game_id));
        }
        setLoading(false);
    };

    useEffect(() => {
        getFavouritesGames();
    }, []);

    // Flatten all games from all providers
    const allGames = games?.providers?.flatMap(provider => provider.games || []) || [];
    // Filter games whose id is in favouriteIds
    const favouriteGames = allGames.filter(game => favouriteIds.includes(game.id));

    return (
        <div>
            <div className="text-3xl font-bold mt-30 mb-5 items-center justify-center flex">Favourites</div>
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
                    <span className="text-lg text-gray-600">Loading your favourites...</span>
                </div>
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-3 mx-5">
                    {favouriteGames.map((game) => (
                        <div
                            key={game.id}
                            className="aspect-[3/4] rounded-lg overflow-hidden relative cursor-pointer"
                            onClick={() => singleGameRedirect(game.id, game.game_name)}
                        >
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

export default FavouritePage;