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
  const [showLoader, setShowLoader] = useState(true);

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
        const data = await apiRequest<GameData>('/games/single/2021');
        setGameData(data);
      } catch (error) {
        console.error('Error fetching game data:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchGame();
  }, [router ]);

  // Handle iframe load event
  const handleIframeLoad = () => {
    // Keep showing loader for additional 5 seconds after iframe loads
    setTimeout(() => {
      setShowLoader(false);
    }, 6000);
  };

  // Show loader overlay when loading data or during the extended loader period
  const shouldShowLoader = loading || showLoader;

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
    <div className="w-full bg-black mt-26 pt-0 relative">
      {gameData ? (
        <>
          {/* Iframe loads in background but stays hidden until loader finishes */}
          <div 
            className={`w-full mx-auto transition-opacity duration-300 ${shouldShowLoader ? 'opacity-0' : 'opacity-100'}`} 
            style={{ height: 'calc(100vh - 60px - 104px)' }}
          >
            <iframe
              src={gameData.gameUrl}
              className="w-full border-0"
              style={{ height: '100%' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={gameData.game?.game_name || 'Sports Game'}
              onLoad={handleIframeLoad}
            />
          </div>
          
          {/* Loader overlay */}
          {shouldShowLoader && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white z-10">
              <div className="mb-8 flex flex-col items-center">
                <span className="text-4xl font-extrabold tracking-widest text-yellow-400 drop-shadow-lg animate-pulse">
                  Raza20
                </span>
                <span className="block w-24 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 rounded-full mt-2 mb-2"></span>
              </div>
              <div className="relative flex items-center justify-center mb-6">
                <div className="w-20 h-20 border-8 border-t-transparent border-b-transparent border-l-blue-500 border-r-pink-500 rounded-full animate-spin shadow-lg"></div>
                <div className="absolute w-10 h-10 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full shadow-lg animate-bounce"></div>
              </div>
              <p className="mt-2 text-lg font-medium text-gray-200 tracking-wide">
                Loading game...
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white">
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