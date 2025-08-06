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

    // Handle viewport height for iframe
    useEffect(() => {
        const updateViewportHeight = () => {
            const iframe = iframeRef.current as HTMLIFrameElement | null;
            if (iframe) {
                iframe.style.height = `${window.innerHeight - 60}px`;
            }
        };
        document.body.classList.add('gaming-fullscreen-mode');
        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);
        return () => {
            window.removeEventListener('resize', updateViewportHeight);
            document.body.classList.remove('gaming-fullscreen-mode');
        };
    }, []);

    // Handle browser/hardware back button: always go home
    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            router.push('/');
            console.log("Back button pressed",e);
        };
        window.history.pushState(null, '', window.location.href); // add extra state
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

    const handleIframeLoad = () => {
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
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-widest text-yellow-400">
                        Raza20
                    </span>
                </div>
                <button
                    onClick={handleBackClick}
                    className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-200"
                    aria-label="Close"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
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
                <div className="flex flex-col items-center justify-center h-full text-white" style={{ height: 'calc(100vh - 60px)' }}>
                    <span className="text-2xl font-bold mb-4">No game URL provided.</span>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-500 transition"
                    >
                        Go Home
                    </button>
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