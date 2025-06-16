"use client"
import React from 'react';
import { useSingleGameRedirect } from '@/hooks/singGameRedirect';

const StaticBanner = () => {
    const handleGameRedirect = useSingleGameRedirect();
    
    return (
        <div className="flex flex-col items-center gap-y-6 md:flex-row md:justify-center md:gap-x-8 mt-8 w-[90vw] mx-auto mb-8">
            {/* Banner 1 */}
            <div className="relative w-[382px] h-[92px] rounded-lg overflow-hidden cursor-pointer md:w-[500px] md:h-[140px] lg:w-[650px] lg:h-[160px] xl:w-[800px] xl:h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-900 bg-opacity-90 rounded-lg" >
                    <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/banner/1.png')" }} onClick={() => handleGameRedirect(1980, "Crazy Time")}></div>
                </div>
                <h2 className="absolute left-2 top-12 font-bold text-[16.5px] leading-3 flex items-center text-white font-['Inter'] md:text-2xl md:top-20">
                    Crazy Time
                </h2>
            </div>
            {/* Banner 2 */}
            <div className="relative w-[382px] h-[92px] rounded-lg overflow-hidden cursor-pointer md:w-[500px] md:h-[140px] lg:w-[650px] lg:h-[160px] xl:w-[800px] xl:h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-900 bg-opacity-90 rounded-lg">
                    <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/banner/2.png')" }} onClick={() => handleGameRedirect(1974, "Crazy 777")}></div>
                </div>
                <h2 className="absolute left-2 top-12 font-bold text-[16.5px] leading-3 flex items-center text-white font-['Inter'] md:text-2xl md:top-20">
                    Crazy 777
                </h2>
            </div>
        </div>
    );
};

export default StaticBanner;