import React from 'react';

const AllGameMobile = () => {
    return (
        <div className="relative w-full min-h-screen bg-gray-50">
            {/* All Games Heading */}
            <div className="absolute flex items-center font-bold text-lg text-[#1D3D68] w-[89px] h-[28px] left-[4px] top-[123.17px] font-['Inter'] text-[18px] leading-[28px]">
                All Games
            </div>

            {/* View All Button */}
            <div className="absolute bg-[#DFE6EE] rounded-bl-lg w-[80.09px] h-[26px] right-0 top-[123.17px]">
                {/* Background */}
                <div className="absolute w-[197px] h-[79px] right-0 top-0 bg-white"></div>
                
                {/* View All Text */}
                <div className="absolute flex items-center text-center font-medium text-xs text-[#1D3D68] w-[46.43px] h-[16px] left-[calc(50%-46.43px/2-8.83px)] top-[5px] font-['Inter'] text-[12px] leading-[16px]">
                    View All
                </div>
            </div>

            {/* Background Container */}
            <div className="absolute bg-white rounded h-[228px] left-[4px] right-[4px] top-[151.17px]">
                {/* Hot Games Container */}
                <div className="absolute overflow-scroll h-[42px] left-[10px] right-[10px] top-[22px]">
                    {/* Hot Games Background */}
                    <div className="absolute bg-[#F2F3F5] w-[138.56px] h-[42px] left-0 top-[calc(50%-42px/2)] rounded-full">
                        {/* Fire Icon with Blur Effect */}
                        <div className="absolute w-[30px] h-[30px] left-[-4px] top-[calc(50%-30px/2)] blur-[1px]" />
                        
                        {/* Fire Icon */}
                        <div className="absolute bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center w-[30px] h-[30px] left-[calc(50%-30px/2-44.28px)] top-[calc(50%-30px/2)]">
                            <span className="text-white text-sm">🔥</span>
                        </div>

                        {/* Hot Games Text */}
                        <div className="absolute flex items-center capitalize font-medium text-[#1D3D68] w-[85.02px] h-[24px] left-[44px] top-[9px] font-['Inter'] text-[16px] leading-[24px]">
                            hot games
                        </div>
                    </div>

                    {/* Category Icon 1 */}
                    <div className="absolute bg-[#F2F3F5] rounded-full flex items-center justify-center w-[42px] h-[42px] left-[146.56px] top-[calc(50%-42px/2)]">
                        <div className="bg-blue-600 rounded-full flex items-center justify-center w-[30px] h-[30px]">
                            <span className="text-white text-sm">🏆</span>
                        </div>
                    </div>

                    {/* Category Icon 2 */}
                    <div className="absolute bg-[#F2F3F5] rounded-full flex items-center justify-center w-[42px] h-[42px] left-[196.56px] top-[calc(50%-42px/2)]">
                        <div className="bg-blue-600 rounded-full flex items-center justify-center w-[30px] h-[30px]">
                            <span className="text-white text-sm">🎲</span>
                        </div>
                    </div>

                    {/* Category Icon 3 */}
                    <div className="absolute bg-[#F2F3F5] rounded-full flex items-center justify-center w-[42px] h-[42px] left-[246.56px] top-[calc(50%-42px/2)]">
                        <div className="bg-blue-600 rounded-full flex items-center justify-center w-[30px] h-[30px]">
                            <span className="text-white text-sm">🎰</span>
                        </div>
                    </div>

                    {/* Category Icon 4 */}
                    <div className="absolute bg-[#F2F3F5] rounded-full flex items-center justify-center w-[42px] h-[42px] left-[296.56px] top-[calc(50%-42px/2)]">
                        <div className="bg-blue-600 rounded-full flex items-center justify-center w-[30px] h-[30px]">
                            <span className="text-white text-sm">⚙️</span>
                        </div>
                    </div>
                </div>

                {/* Games Container */}
                <div className="absolute left-[10px] right-[10px] top-[80px] bottom-[18px]">
                    <div className="flex gap-3 h-full overflow-x-auto">
                        {/* Game Card 1 - Aviator */}
                        <div className="flex-shrink-0 w-[85px] rounded-lg overflow-hidden h-[130px]">
                            <div className="w-full h-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex flex-col justify-between p-3">
                                <div className="text-white font-bold text-sm">Aviator</div>
                                {/* <div className="flex items-center justify-between">
                                    <div className="bg-black/20 backdrop-blur-sm rounded px-2 py-1">
                                        <span className="text-white text-xs font-medium">57.89</span>
                                    </div>
                                    <div className="text-white text-xs font-medium">77Gaming</div>
                                </div> */}
                            </div>
                        </div>

                        {/* Game Card 2 - Crazy Time */}
                        <div className="flex-shrink-0 w-[85px] rounded-lg overflow-hidden h-[130px]">
                            <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex flex-col justify-between p-3">
                                <div className="text-white font-bold text-sm">Crazy Time</div>
                                {/* <div className="flex items-center justify-end">
                                    <div className="text-white text-xs font-medium">Evolution</div>
                                </div> */}
                            </div>
                        </div>

                        {/* Game Card 3 - Starburst */}
                        <div className="flex-shrink-0 w-[85px] rounded-lg overflow-hidden h-[130px]">
                            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 flex flex-col justify-between p-3">
                                <div className="text-white font-bold text-sm">STARBURST</div>
                                {/* <div className="flex items-center justify-end">
                                    <div className="text-white text-xs font-medium">NetEnt</div>
                                </div> */}
                            </div>
                        </div>

                        {/* Game Card 4 - Gonzo's Quest */}
                        <div className="flex-shrink-0 w-[85px] rounded-lg overflow-hidden h-[130px]">
                            <div className="w-full h-full bg-gradient-to-br from-green-700 via-green-800 to-green-900 flex flex-col justify-between p-3">
                                <div className="text-white font-bold text-sm">Gonzo's Quest</div>
                                {/* <div className="flex items-center justify-end">
                                    <div className="text-white text-xs font-medium">NetEnt</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Providers Section */}
            {/* Providers Heading */}
            <div className="absolute flex items-center font-bold text-lg text-[#1D3D68] w-[84.75px] h-[28px] left-[4px] top-[395.17px] font-['Inter'] text-[18px] leading-[28px]">
                Providers
            </div>

            {/* View All Button */}
            {/* <div className="absolute w-[56.09px] h-[20px] left-[329.91px] top-[calc(50%-20px/2-323.41px)] bg-[rgba(237,240,243,0.75)] border border-[#E7EBF2] shadow-lg rounded">
                <div className="absolute flex items-center text-center capitalize font-medium text-xs text-[#276AA5] w-[46.43px] h-[15px] left-[calc(50%-46.43px/2+0.17px)] top-[calc(50%-15px/2-0.5px)] font-['Inter'] text-[12px] leading-[16px]">
                    View All
                </div>
            </div> */}

            {/* Provider Items Container */}
            <div className="absolute left-[4px] right-[4px] top-[431.17px]">
                {/* First Row */}
                <div className="flex gap-2 mb-2">
                    {/* Provider 1 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 1</span>
                    </div>

                    {/* Provider 2 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 2</span>
                    </div>

                    {/* Provider 3 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 3</span>
                    </div>

                    {/* Provider 4 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 4</span>
                    </div>
                </div>

                {/* Second Row */}
                <div className="flex gap-2">
                    {/* Provider 5 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 5</span>
                    </div>

                    {/* Provider 6 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 6</span>
                    </div>

                    {/* Provider 7 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 7</span>
                    </div>

                    {/* Provider 8 */}
                    <div className="flex-1 h-[36px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">Provider 8</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllGameMobile;