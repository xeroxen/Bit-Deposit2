"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect, useRef } from "react";

interface Document extends globalThis.Document {
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    webkitFullscreenElement?: Element;
    msFullscreenElement?: Element;
    mozFullScreenElement?: Element;
}

interface HTMLDivElement extends globalThis.HTMLDivElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
}

const GamingContent = () => {
    const searchParams = useSearchParams();
    const gameUrl = searchParams.get("url");
    const [showLoader, setShowLoader] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldShowLoader = showLoader;

    const handleIframeLoad = () => {
        // Keep showing loader for additional seconds after iframe loads
        setTimeout(() => {
            setShowLoader(false);
            // Request fullscreen when the iframe is loaded and loader disappears
            if (userInteracted) {
                requestFullscreen();
            }
        }, 6000);
    };

    const requestFullscreen = async () => {
        if (containerRef.current) {
            try {
                if (containerRef.current.requestFullscreen) {
                    await containerRef.current.requestFullscreen();
                    setIsFullscreen(true);
                } else if (containerRef.current.webkitRequestFullscreen) {
                    await containerRef.current.webkitRequestFullscreen();
                    setIsFullscreen(true);
                } else if (containerRef.current.mozRequestFullScreen) {
                    await containerRef.current.mozRequestFullScreen();
                    setIsFullscreen(true);
                } else if (containerRef.current.msRequestFullscreen) {
                    await containerRef.current.msRequestFullscreen();
                    setIsFullscreen(true);
                }
            } catch (err) {
                console.error("Could not enter fullscreen mode:", err);
            }
        }
    };

    const exitFullscreen = async () => {
        const doc = document as Document;
        try {
            if (doc.exitFullscreen) {
                await doc.exitFullscreen();
                setIsFullscreen(false);
            } else if (doc.webkitExitFullscreen) {
                await doc.webkitExitFullscreen();
                setIsFullscreen(false);
            } else if (doc.mozCancelFullScreen) {
                await doc.mozCancelFullScreen();
                setIsFullscreen(false);
            } else if (doc.msExitFullscreen) {
                await doc.msExitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error("Could not exit fullscreen mode:", err);
        }
    };

    // Handle user interaction to enable fullscreen
    const handleUserInteraction = () => {
        setUserInteracted(true);
        // If loader is already hidden, request fullscreen immediately
        if (!showLoader) {
            requestFullscreen();
        }
    };

    // Event listener for fullscreen changes
    useEffect(() => {
        const doc = document as Document;
        const fullscreenChangeHandler = () => {
            setIsFullscreen(Boolean(
                doc.fullscreenElement || 
                doc.webkitFullscreenElement ||
                doc.mozFullScreenElement ||
                doc.msFullscreenElement
            ));
        };

        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
        document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('msfullscreenchange', fullscreenChangeHandler);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('msfullscreenchange', fullscreenChangeHandler);
        };
    }, []);

    // Prevent scroll when in fullscreen mode
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFullscreen]);

    // Add event listeners for user interaction
    useEffect(() => {
        const handleClick = () => handleUserInteraction();
        const handleKeyPress = () => handleUserInteraction();
        const handleTouch = () => handleUserInteraction();

        document.addEventListener('click', handleClick, { once: true });
        document.addEventListener('keydown', handleKeyPress, { once: true });
        document.addEventListener('touchstart', handleTouch, { once: true });

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('touchstart', handleTouch);
        };
    }, []);

    // ESC key to exit fullscreen
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isFullscreen) {
                exitFullscreen();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [isFullscreen]);

    return (
        <div 
            ref={containerRef}
            className={`w-full h-screen fixed top-0 left-0 z-[100] ${isFullscreen ? 'fullscreen-container' : ''}`}
        >
            {gameUrl ? (
                <div className="w-full h-full relative">
                    <iframe
                        src={gameUrl}
                        title="Game"
                        className="w-full h-screen border-0 absolute top-0 left-0"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
                    />
                    
                    {/* Invisible overlay to capture initial user interaction */}
                    {!userInteracted && (
                        <div 
                            className="absolute inset-0 z-10 cursor-pointer"
                            onClick={handleUserInteraction}
                            onTouchStart={handleUserInteraction}
                        />
                    )}
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
                    {!userInteracted && (
                        <p className="mt-4 text-sm text-gray-400 animate-pulse">
                            Click anywhere to continue...
                        </p>
                    )}
                </div>
            )}

            {/* Exit fullscreen hint */}
            {isFullscreen && (
                <div className="absolute top-4 right-4 z-50 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                    Press ESC to exit fullscreen
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
            <style jsx global>{`
                .fullscreen-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 9999;
                }
                
                /* Remove scroll capability when in fullscreen */
                .fullscreen-container:fullscreen {
                    overflow: hidden;
                }

                /* Hide scrollbars when in fullscreen mode */
                .fullscreen-container:fullscreen::-webkit-scrollbar {
                    display: none;
                }
                
                .fullscreen-container:fullscreen {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <GamingContent />
        </Suspense>
    );
};

export default GamingPage;