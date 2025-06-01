import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const suggestedItems = [
  {
    id: 1,
    title: "Gonzo's Quest Megaways",
    image: "/placeholder.svg?height=200&width=300",
    category: "Adventure",
  },
  {
    id: 2,
    title: "Duck Hunter",
    image: "/placeholder.svg?height=200&width=300",
    category: "Action",
  },
  {
    id: 3,
    title: "Provider Of The Month",
    image: "/placeholder.svg?height=200&width=300",
    category: "Featured",
  },
  {
    id: 4,
    title: "Mystic Fortune",
    image: "/placeholder.svg?height=200&width=300",
    category: "Fantasy",
  },
  {
    id: 5,
    title: "Ocean Treasures",
    image: "/placeholder.svg?height=200&width=300",
    category: "Adventure",
  },
  {
    id: 6,
    title: "Space Explorer",
    image: "/placeholder.svg?height=200&width=300",
    category: "Sci-Fi",
  },
]

export default function SuggestedCarousel() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Selected For You</h2>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {suggestedItems.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
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
                </CardContent>
              </Card>
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
