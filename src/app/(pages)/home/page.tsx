"use client"
import AllGameMobile from '@/components/all-game-mobile/all-game-mobile';
import EvolutionBanner from '@/components/Banners/evolutionBanner';
import SuggestedCarousel from '@/components/suggested-carrousel/suggested-carousel';
import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 mt-10">
            {/* Game Section */}
            <div className="pt-20"> {/* Add top padding to avoid navbar overlap */}
                <div className="relative w-[400px] h-[120px] mx-auto mt-1 flex justify-between items-start gap-2">
                    {/* Game Card 1 - Up To 100% (Deposit Bonus) */}
                    <div className="relative w-[92px] h-[120px] flex flex-col items-center">
                        <div className="relative">
                            <div className="w-[92px] h-[92px] rounded-[20px] relative overflow-hidden mb-2 shadow-lg bg-gradient-to-br from-red-400 via-red-500 to-orange-400">
                                <div className="p-3 h-full flex flex-col justify-center items-center relative">
                                    <div className="text-white font-bold text-xs text-center tracking-wide leading-tight mb-0.5">DEPOSIT</div>
                                    <div className="text-white font-bold text-xs text-center tracking-wide leading-tight mb-1.5">BONUS</div>
                                    <div className="flex gap-1 flex-wrap justify-center mt-1.5">
                                        <div className="text-sm">💰</div>
                                        <div className="text-sm">💰</div>
                                        <div className="text-sm">💰</div>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 bg-red-500 rounded-[10px] px-2 py-1 z-10">
                                    <span className="text-white font-bold text-[8px] leading-[10px] uppercase tracking-wide">NEW</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Up To 100%</div>
                    </div>

                    {/* Game Card 2 - Lottery */}
                    <div className="relative w-[92px] h-[120px] flex flex-col items-center">
                        <div className="w-[92px] h-[92px] rounded-[20px] relative overflow-hidden mb-2 shadow-lg bg-gradient-to-br from-violet-500 to-purple-700">
                            <div className="p-3 h-full flex flex-col justify-center items-center relative">
                                <div className="text-white font-bold text-xs text-center tracking-wide leading-tight">LOTTERY</div>
                                <div className="flex gap-1 flex-wrap justify-center mt-1.5">
                                    <div className="text-xs">🎱</div>
                                    <div className="text-xs">🟡</div>
                                    <div className="text-xs">🔴</div>
                                    <div className="text-xs">🟢</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Lottery</div>
                    </div>

                    {/* Game Card 3 - Casino */}
                    <div className="relative w-[92px] h-[120px] flex flex-col items-center">
                        <div className="w-[92px] h-[92px] rounded-[20px] relative overflow-hidden mb-2 shadow-lg bg-gradient-to-br from-pink-500 to-pink-700">
                            <div className="p-3 h-full flex flex-col justify-center items-center relative">
                                <div className="text-white font-bold text-xs text-center tracking-wide leading-tight">CASINO</div>
                                <div className="flex gap-1 items-center mt-1.5">
                                    <div className="text-sm">🎲</div>
                                    <div className="text-sm">🔵</div>
                                    <div className="text-sm">⚡</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Casino</div>
                    </div>

                    {/* Game Card 4 - Cricket */}
                    <div className="relative w-[92px] h-[120px] flex flex-col items-center">
                        <div className="relative">
                            <div className="w-[92px] h-[92px] rounded-[20px] relative overflow-hidden mb-2 shadow-lg bg-gradient-to-br from-violet-500 to-purple-700">
                                <div className="p-3 h-full flex flex-col justify-center items-center relative">
                                    <div className="text-white font-bold text-xs text-center tracking-wide leading-tight">CRICKET</div>
                                    <div className="flex gap-1 items-center mt-1.5">
                                        <div className="text-sm">🏏</div>
                                        <div className="text-sm">🔴</div>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 bg-red-500 rounded-[10px] px-2 py-1 z-10">
                                    <span className="text-white font-bold text-[8px] leading-[10px] uppercase tracking-wide">NEW</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Cricket</div>
                    </div>
                </div>
            </div>
            <AllGameMobile />
            <SuggestedCarousel />
            <EvolutionBanner />
        </div>
    );
};

export default Home;