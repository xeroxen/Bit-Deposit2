"use client";

import { PageMetadata } from "@/components/PageMetadata";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useEffect, useRef } from "react";

const GamingContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const gameUrl = searchParams.get("url");
    const [showLoader, setShowLoader] = useState(true);
    const iframeRef = useRef(null);
    
    useEffect(() => {
        const updateViewportHeight = () => {
            const iframe = iframeRef.current as HTMLIFrameElement | null;
            if (iframe) {
                // Adjust height to account for navbar
                iframe.style.height = `${window.innerHeight - 60}px`;
            }
        };
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // Set initial height
        updateViewportHeight();
        
        // Update on resize
        window.addEventListener('resize', updateViewportHeight);
        
        // Clean up
        return () => {
            window.removeEventListener('resize', updateViewportHeight);
            // Restore scrolling when component unmounts
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);
    
    const handleIframeLoad = () => {
        // Keep showing loader for additional seconds after iframe loads
        setTimeout(() => {
            setShowLoader(false);
        }, 6000);
    };

    const handleBackClick = () => {
        router.push('/');
    };

    return (
        <div className="w-full h-screen fixed top-0 left-0 z-[100] overflow-hidden">
            {/* Navbar */}
            <div className="w-full h-15 bg-black/90 backdrop-blur-sm border-b border-gray-700 flex items-center justify-between px-4 z-50 relative">
                <button
                    onClick={handleBackClick}
                    className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-200"
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span className="font-medium">Back</span>
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-widest text-yellow-400">
                        Raza20
                    </span>
                </div>
                <div className="w-12"></div> {/* Spacer for centering */}
            </div>

            {gameUrl ? (
                <div className="w-full h-full relative overflow-hidden" style={{ height: 'calc(100vh - 60px)' }}>
                    <iframe
                        ref={iframeRef}
                        src={gameUrl}
                        title="Game"
                        className="w-full border-0 absolute top-0 left-0"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
                        style={{ overflow: 'hidden' }}
                        scrolling="no"
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-white" style={{ height: 'calc(100vh - 60px)' }}>
                    No game URL provided.
                </div>
            )}

            {showLoader && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white z-50">
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
        </div>
    );
};

const GamingPage = () => {
    return (
        <>
        <PageMetadata />
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-lg">Loading...</div>
            </div>
        }>
            <GamingContent />
        </Suspense>
        </>
    );
};

export default GamingPage;