"use client"
import React from 'react';
import { useSingleGameRedirect } from '@/hooks/singGameRedirect';

const StaticBanner = () => {
    const handleGameRedirect = useSingleGameRedirect();
    
    return (
        <div>
                {/* Static Banner */}
                        <div className="relative mt-8">
                <div className="absolute w-[382px] h-[92px] left-[calc(50%-191px)] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-900 bg-opacity-90 rounded-lg cursor-pointer" >
                        {/* Replace with actual image URL */}
                        <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/banner/1.png')" }} onClick={() => handleGameRedirect(1980, "Crazy Time")}></div>
                    </div>
                    <h2 className="absolute left-2 top-12 font-bold text-[16.5px] leading-3 flex items-center text-white font-['Inter']">
                        Crazy Time
                    </h2>
                </div>
                {/* Spacer to maintain layout flow */}
                <div className="h-[120px]"></div>
            </div>
            {/* Static Banner */}
            <div className="relative mt-2">
                <div className="absolute w-[382px] h-[92px] left-[calc(50%-191px)] rounded-lg overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-900 bg-opacity-90 rounded-lg">
                        {/* Replace with actual image URL */}
                        <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/banner/2.png')" }} onClick={() => handleGameRedirect(1974, "Crazy 777")}></div>
                    </div>
                    <h2 className="absolute left-2 top-12 font-bold text-[16.5px] leading-3 flex items-center text-white font-['Inter']">
                        Crazy 777
                    </h2>
                </div>
                {/* Spacer to maintain layout flow */}
                <div className="h-[120px]"></div>
            </div>
        </div>
    );
};

export default StaticBanner;