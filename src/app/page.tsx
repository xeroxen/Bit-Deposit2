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
            <div className="pt-20"> {/* Reduced from pt-20 to pt-8 */}
                <div className="relative w-[382px] h-[105px] mx-auto mt-1 flex justify-between items-start gap-2">
                    {/* Game Card 1 - Up To 100% (Deposit Bonus) */}
                    <div className="relative w-[92px] h-[105px] flex flex-col items-center">
                        <div className="relative">
                            <div className="w-[84px] h-[80px] rounded-[20px] relative overflow-hidden mb-2 ">
                               <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-1.png?format=optimal&w=256&q=85" alt="Up To 100%" width={84} height={80} />
                            </div>
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Up To 100%</div>
                    </div>

                    {/* Game Card 2 - Lottery */}
                    <div className="relative w-[92px] h-[105px] flex flex-col items-center cursor-pointer" onClick={() => handleGameRedirect(2002, "Lottery 7 up 7 down")}>
                        <div className="w-[84px] h-[80px] rounded-[20px] relative overflow-hidden mb-2 ">
                            <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-2.png?format=optimal&w=256&q=85" alt="Up To 100%" width={84} height={80} />
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Lottery</div>
                    </div>

                    {/* Game Card 3 - Casino */}
                    <div className="relative w-[92px] h-[105px] flex flex-col items-center cursor-pointer" onClick={() => handleGameRedirect(1992, "Casino Mega Wheel")}>
                        <div className="w-[84px] h-[80px] rounded-[20px] relative overflow-hidden mb-2 ">
                            <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-3.png?format=optimal&w=256&q=85" alt="Up To 100%" width={84} height={80} />
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Casino</div>
                    </div>

                    {/* Game Card 4 - Cricket */}
                    <div className="relative w-[92px] h-[105px] flex flex-col items-center">
                        <div className="relative">
                            <div className="w-[84px] h-[80px] rounded-[20px] relative overflow-hidden mb-2 ">
                                <Link href="/sports">
                                    <Image src="https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/frontend/user/public/assets/images/landing-page/mobile-version/category-menu/game-4.png?format=optimal&w=256&q=85" alt="Up To 100%" width={84} height={80} />
                                </Link>
                            </div>
                        </div>
                        <div className="w-fit h-4 font-semibold text-xs leading-4 flex items-center text-center text-[#1D3D68]">Cricket</div>
                    </div>
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
        </div>
    );
};

export default Home;