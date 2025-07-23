"use client";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

interface Banner {
  id: number;
  link: string | null;
  image: string;
  type: string;
  description: string | null;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/banners`;
const IMAGE_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

const MobileBannerCarousel: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setBanners(data.data.filter((b: Banner) => b.type === "home"));
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-4 md:hidden">
        <div className="w-[92vw] h-32 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!banners.length) return null;

  return (
    <div className="w-full flex flex-col justify-center items-center py-4 px-5 md:hidden">
      <div className="w-full relative">
        <Carousel
          opts={{ align: "start", loop: true, dragFree: false, containScroll: "trimSnaps", slidesToScroll: 1 }}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id} className="basis-full cursor-pointer">
                {banner.link ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden">
                      <Image
                        src={IMAGE_BASE + banner.image}
                        alt={banner.description || "Banner"}
                        fill
                        className="object-cover rounded-xl"
                        priority
                      />
                    </div>
                ) : (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden">
                    <Image
                      src={IMAGE_BASE + banner.image}
                      alt={banner.description || "Banner"}
                      fill
                      className="object-cover rounded-xl"
                      priority
                    />
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default MobileBannerCarousel; 