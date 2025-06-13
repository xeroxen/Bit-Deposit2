import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import { useAuth } from "@/lib/authContext"
import { useWallet } from "@/lib/walletContext"
import { apiRequest } from "@/lib/authentication"
import { toast } from "sonner"

interface SingleGameResponse {
  gameUrl: string;
}

interface ErrorResponse {
  error: string;
  status: boolean;
  action?: string;
}

const suggestedItems = [
  {
    id: 1,
    title: "Crash",
    image: "/suggested/3.png",
    category: "Action",
    gameId: 1981,
  },
  {
    id: 2,
    title: "Baccarat Classic",
    image: "/suggested/1.png",
    category: "Adventure",
    gameId: 1997,
  },
  {
    id: 3,
    title: "Mega Fishing",
    image: "/suggested/2.png",
    category: "Featured",
    gameId: 1999,
  }
]

export default function SuggestedCarousel() {
  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )
  const { isAuthenticated, redirectToLogin } = useAuth()
  const { balance } = useWallet()

  const handleGameClick = async (item: typeof suggestedItems[0]) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please login to play")
      redirectToLogin()
      return
    }

    // Check if user has balance
    if (parseFloat(balance) <= 0) {
      toast.error(`Please deposit to play ${item.title}`)
      return
    }

    // Show loading toast
    const toastId = toast.loading(`Loading ${item.title}...`)

    try {
      // Call API to get game URL
      if (item.gameId) {
        const response = await apiRequest<SingleGameResponse | ErrorResponse>(`/games/single/${item.gameId}`)
        
        // Open game URL in a new tab
        if ('gameUrl' in response && response.gameUrl) {
          toast.success(`${item.title} ready to play!`)
          window.location.href = response.gameUrl
        } else {
          toast.error("Game URL not found in response")
          console.error("Game URL not found in response")
        }
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && error.status === false) {
        if ('action' in error && error.action === "login") {
          toast.error("Please login to play")
          redirectToLogin()
          return
        }
        if ('action' in error && error.action === "deposit") {
          toast.error(`Please deposit to play ${item.title}`)
          return
        }
      }
      toast.error("Failed to load game")
      console.error("Error loading game:", error)
    } finally {
      toast.dismiss(toastId)
    }
  }

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
              <div 
                className="p-0 relative cursor-pointer group"
                onClick={() => item.gameId ? handleGameClick(item) : undefined}
              >
                <div className="relative h-[150px] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
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
