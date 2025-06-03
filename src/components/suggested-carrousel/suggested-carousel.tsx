import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef } from "react"

const suggestedItems = [
  {
    id: 1,
    title: "Duck Hunter",
    image: "https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/06/01/images/66768/112-9111a433973ea9976d2e5c4fac5d0eb5.png?w=640&q=85",
    category: "Action",
  },
  {
    id: 2,
    title: "Gonzo's Quest Megaways",
    image: "https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/06/02/images/67045/3-d2e271a839bc6fb8928ca6f65f452b0b.png?w=640&q=85",
    category: "Adventure",
  },
  {
    id: 3,
    title: "Provider Of The Month",
    image: "https://bitdeposit-production.s3.ap-southeast-1.amazonaws.com/backend/public/2025/06/02/images/67116/112-c0843f87152e237d723e76792ab7fd5b.png?w=640&q=85",
    category: "Featured",
  }
]

export default function SuggestedCarousel() {
  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Selected For You</h2>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
        }}
        plugins={[autoplayRef.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {suggestedItems.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              {/* <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"> */}
                <div className="p-0 relative">
                  <div className="relative h-[150px] overflow-hidden rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-white">
                        <p className="text-xs font-medium text-gray-300 mb-1 uppercase tracking-wide">
                          {item.category}
                        </p>
                        <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                      </div>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              {/* </Card> */}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-6" />
        <CarouselNext className="hidden sm:flex -right-4 lg:-right-6" />
      </Carousel>

      {/* Mobile navigation hint */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Swipe to see more</p>
      </div>
    </div>
  )
}
