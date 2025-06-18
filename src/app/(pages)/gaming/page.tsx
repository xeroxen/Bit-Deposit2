"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const GamingContent = () => {
    const searchParams = useSearchParams();
    const gameUrl = searchParams.get("url");
    const [showLoader, setShowLoader] = useState(true);
    const shouldShowLoader = showLoader;
    
    console.log("gameUrl", gameUrl);

    const handleIframeLoad = () => {
        // Keep showing loader for additional 2 seconds after iframe loads
        setTimeout(() => {
            setShowLoader(false);
        }, 6000);
    };

    return (
        <div className="w-full h-screen fixed top-0 left-0 z-[100]">
            {gameUrl ? (
                <div className="w-full h-full relative">
                    <iframe
                        src={gameUrl}
                        title="Game"
                        className="w-full h-screen border-0 absolute top-0 left-0"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                        // Fixed: Add sandbox attribute for better control
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-white">
                    No game URL provided.
                </div>
            )}

            {shouldShowLoader && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white z-50">
                    <div className="mb-8 flex flex-col items-center">
                        <span className="text-4xl font-extrabold tracking-widest text-yellow-400 drop-shadow-lg animate-pulse">
                            FND777
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
        </div>
    );
};

const GamingPage = () => {
    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-lg">Loading...</div>
            </div>
        }>
            <GamingContent />
        </Suspense>
    );
};

export default GamingPage;