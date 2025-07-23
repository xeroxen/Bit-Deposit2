"use client"
import AllGameMobile from '@/components/all-game-mobile/all-game-mobile';
import EvolutionBanner from '@/components/Banners/evolutionBanner';
import StaticBanner from '@/components/static-banner/static-banner';
import StaticGameCarousel from '@/components/static-game-carousel/static-game-carousel';
import SuggestedCarousel from '@/components/suggested-carrousel/suggested-carousel';
import { useSingleGameRedirect } from '@/hooks/singGameRedirect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = () => {
    const handleGameRedirect = useSingleGameRedirect();
    return (
        <div className=" bg-gray-50 mt-10">
            {/* Game Section */}
            {/* Mobile: Show game cards, hide on md and up */}
            <div className="pt-20 block w-full md:hidden">
                <div className="relative w-full mx-auto mt-1 flex justify-between items-start gap-1 px-2">
                    {/* Game Card 1 - Up To 100% (Deposit Bonus) */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-1">
                           <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-1.png?format=optimal&w=256&q=85" alt="Up To 100%" fill style={{objectFit: 'cover'}} />
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Up To 100%</div>
                    </div>

                    {/* Game Card 2 - Lottery */}
                    <div className="flex-1 flex flex-col items-center cursor-pointer" onClick={() => handleGameRedirect(2002, "Lottery 7 up 7 down")}> 
                        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-1">
                            <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-2.png?format=optimal&w=256&q=85" alt="Up To 100%" fill style={{objectFit: 'cover'}} />
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Lottery</div>
                    </div>

                    {/* Game Card 3 - Casino */}
                    <div className="flex-1 flex flex-col items-center cursor-pointer" onClick={() => handleGameRedirect(1992, "Casino Mega Wheel")}> 
                        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-1">
                            <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-3.png?format=optimal&w=256&q=85" alt="Up To 100%" fill style={{objectFit: 'cover'}} />
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Casino</div>
                    </div>

                    {/* Game Card 4 - Cricket */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-1">
                            <Link href="/sports">
                                <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-4.png?format=optimal&w=256&q=85" alt="Up To 100%" fill style={{objectFit: 'cover'}} />
                            </Link>
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Cricket</div>
                    </div>
                </div>
            </div>
            {/* Desktop: Show full-width banner section, hide on small devices */}
            <div className="hidden md:block pt-10 lg:pt-20 w-full px-4 md:px-8 lg:px-10">
                <div
                    className="w-full rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 gap-8 relative"
                    style={{
                        backgroundImage: 'url("https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2024/12/11/images/18456/t_m_softic_1920x380_bdt-bd43df0d5e98b4c8a67b34f8f9888047.png?format=webp&w=1920&q=95")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '380px',
                    }}
                >
                    {/* Darker overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none z-0" />
                    <div className="flex-1 z-10">
                        <h2 className="text-3xl font-bold text-[#ffffff] mb-2 drop-shadow-lg">Welcome to the Ultimate Gaming Experience!</h2>
                        <p className="text-lg text-[#ffffff] mb-4 drop-shadow-lg">Enjoy Casino, Lottery, Cricket, and more. Explore our top games and exclusive bonuses on desktop.</p>
                        <div className="flex gap-4 mt-4">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                                onClick={() => handleGameRedirect(1992, "Casino Mega Wheel")}
                            >
                                Play Casino
                            </button>
                            <Link href="/sports">
                                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                                    Go to Cricket
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* Optionally keep the right-side image for extra effect, or remove if not needed */}
                    {/* <div className="flex-shrink-0 hidden lg:block z-10">
                        <Image
                            src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/desktop-banner/banner-main.png"
                            alt="Gaming Banner"
                            width={400}
                            height={220}
                            className="rounded-xl object-cover"
                        />
                    </div> */}
                    {/* Overlay for better text readability (optional) */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />
                </div>
            </div>
            {/* Reduced margin between sections */}
            <div className="mt-6"> {/* Added wrapper with smaller margin */}
            <AllGameMobile />
            </div>
            <SuggestedCarousel />
            <EvolutionBanner />
            <StaticGameCarousel />
            <StaticBanner />

            {/* Support Button - Fixed at Bottom Right */}
            <Link href="/support">
                <button className="fixed bottom-20 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all z-50 flex items-center justify-center gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                    </svg>
                </button>
            </Link>
        </div>
    );
};

export default Home;