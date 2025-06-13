"use client"

import Image from "next/image"
import { useCallback } from "react"
import { apiRequest, isAuthenticated, redirectToLogin } from "@/lib/authentication"
import { toast } from "sonner"
import { ErrorResponse, SingleGameResponse } from "@/types/game.type"
import { useRouter } from "next/navigation"

export default function EvolutionBanner() {
  const router = useRouter();
  const handleGameRedirect = useCallback(async () => {
      if (!isAuthenticated()) {
        redirectToLogin()
        return
      }
      let toastId: string | number | undefined;
      try {
        toastId = toast.loading(`Loading Sweet...`);
        const response = await apiRequest<SingleGameResponse | ErrorResponse>(`/games/single/1991`);

        // Check if response indicates authentication failure
        
       
        // Open game URL in a new tab
        if ('gameUrl' in response && response.gameUrl) {
            toast.success(`Sweet ready to play!`);
            setTimeout(() => {
              window.location.href = response.gameUrl;
            }, 500); // Wait 500ms so the toast is visible
        } else {
            toast.error("Game URL not found in response");
            console.error("Game URL not found in response");
        }
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'status' in error && error.status === false && 'action' in error && error.action === "login") {
            toast.error("Please login to play");
            router.push("/login");
            return;
        }
        if (error && typeof error === 'object' && 'status' in error && error.status === false && 'action' in error && error.action === "deposit") {
          toast.error(`Please deposit to play Sweet`);
          return;
      }
    } finally {
        if (toastId !== undefined) toast.dismiss(toastId);
    }
  }, [router])

  return (
    <div className="relative w-full max-w-[382px] h-[168px] mx-auto overflow-hidden rounded-2xl style ">
      <Image src="/banner/evolution.png" alt="Evolution Banner" fill onClick={handleGameRedirect} className="cursor-pointer" />
    </div>
  )
}
