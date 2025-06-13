"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest, isAuthenticated } from '@/lib/authentication';
import Link from 'next/link';

interface GameData {
  game: {
    id: number;
    game_name: string;
    provider: {
      name: string;
    };
    // other game properties
  };
  gameUrl: string;
  token: string;
}

const SportsPage = () => {
  const router = useRouter();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetchGame = async () => {
      try {
        // Check if user is authenticated
        if (!isAuthenticated()) {
          // Redirect to login page if not authenticated
          router.push('/login');
          return;
        }
        
        // Use apiRequest instead of direct fetch
        const data = await apiRequest<GameData>('/games/single/1988');
        setGameData(data);
      } catch (error) {
        console.error('Error fetching game data:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchGame();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading game...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div className="bg-red-600 p-4 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-200 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen pt-[106px]">
      {gameData ? (
        <div className="w-full h-[calc(100vh-106px)] mx-auto">
          <iframe
            src={gameData.gameUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={gameData.game?.game_name || 'Sports Game'}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-106px)] bg-gray-900 text-white">
          <p className="text-xl">Unable to load game. Please try again later.</p>
          <Link href="/login">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Return to Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SportsPage;