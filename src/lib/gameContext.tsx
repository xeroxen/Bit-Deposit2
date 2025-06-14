'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameResponse, ApiResponse } from '@/types/game.type';

interface GameContextType {
  games: GameResponse | null;
  gameProviders: ApiResponse | null;
  loading: boolean;
  refreshGames: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<GameResponse | null>(null);
  const [gameProviders, setGameProviders] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const gamesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/all`);
      const gamesData: GameResponse = await gamesRes.json();
      setGames(gamesData);
    } catch (error) {
      setGames(null);
      console.error('Error fetching games:', error);
    }
    setLoading(false);
  };

  const fetchGameProviders = async () => {
    try {
      const providersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game-cat`);
      const providersData: ApiResponse = await providersRes.json();
      setGameProviders(providersData);
    } catch (error) {
      setGameProviders(null);
      console.error('Error fetching game categories:', error);
    }
  };

  const refreshGames = async () => {
    setLoading(true);
    await Promise.all([fetchGames(), fetchGameProviders()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameContext.Provider value={{ games, gameProviders, loading, refreshGames }}>
      {children}
    </GameContext.Provider>
  );
} 