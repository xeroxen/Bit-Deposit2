import React, { useRef, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the Sport interface based on your data structure
interface Sport {
  id: number;
  name: string;
}

// Define props interface for the component
interface SportsMenuProps {
  data: {
    data: Sport[];
    status: string;
  } | null;
  selectedSportId?: number;
  onSelectSport?: (sportId: number) => void;
}

const SportsMenu: React.FC<SportsMenuProps> = ({ data, selectedSportId, onSelectSport }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Return early if data is null or undefined, but after hooks declarations
  if (!data || !data.data) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = 200; // pixels to scroll
      
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
      
      // After scrolling, check if we need to show/hide arrows
      setTimeout(() => {
        if (current.scrollLeft <= 10) {
          setShowLeftArrow(false);
        } else {
          setShowLeftArrow(true);
        }
        
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
          setShowRightArrow(false);
        } else {
          setShowRightArrow(true);
        }
      }, 100);
    }
  };

  // Handle scroll event to update arrow visibility
  const handleScroll = () => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      setShowLeftArrow(current.scrollLeft > 10);
      setShowRightArrow(current.scrollLeft + current.clientWidth < current.scrollWidth - 10);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Left scroll button */}
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/50 rounded-full p-1 shadow-md z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      
      {/* Carousel container */}
     <div>
     <div 
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-2">
            {data.data.map((sport) => (
              <NavigationMenuItem key={sport.id} className="flex-shrink-0">
                <NavigationMenuLink
                  onClick={() => onSelectSport && onSelectSport(sport.id)}
                  className={cn(
                    "cursor-pointer transition-colors duration-200 px-4 py-2 rounded-md whitespace-nowrap",
                    selectedSportId === sport.id
                      ? "bg-[var(--color-two)] text-white hover:bg-[var(--color-one)] hover:text-white focus:text-white"
                      : "hover:bg-[var(--color-one)] hover:text-white focus:text-white border border-gray-200 dark:border-gray-700"
                  )}
                >
                  {sport.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
     </div>
      
      {/* Right scroll button */}
      {showRightArrow && (
        <button 
          onClick={() => scroll('right')}
          className="ml-2 absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/50 rounded-full p-1 shadow-md z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
      
      {/* Add CSS to hide scrollbar */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SportsMenu;