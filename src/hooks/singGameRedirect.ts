import { apiRequest, isAuthenticated, redirectToLogin } from "@/lib/authentication";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
import { ErrorResponse, SingleGameResponse } from "@/types/game.type";
import { useRouter } from "next/navigation";

export const useSingleGameRedirect = () => {
    const router = useRouter();
    const isLoadingRef = useRef(false);
    
    return useCallback((gameId: number, gameName: string) => {
        // Prevent multiple simultaneous requests
        if (isLoadingRef.current) {
            toast.info("Please wait, game is loading...");
            return;
        }

        if (!isAuthenticated()) {
            redirectToLogin()
            return
        }

        let toastId: string | number | undefined;
        
        const handleRedirect = async () => {
            try {
                isLoadingRef.current = true;
                toastId = toast.loading(`Loading ${gameName}...`);
                const response = await apiRequest<SingleGameResponse | ErrorResponse>(`/games/single/${gameId}`);
                
                // Check if response indicates authentication failure
                
                // Open game URL in a new tab
                if ('gameUrl' in response && response.gameUrl) {
                    toast.success(`${gameName} ready to play!`);
                    setTimeout(() => {
                        router.push(`/gaming?url=${response.gameUrl}`);
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
                else if (error && typeof error === 'object' && 'status' in error && error.status === false && 'action' in error && error.action === "deposit") {
                    toast.error(`Please deposit to play ${gameName}`);
                    return;
                }
                else {
                    toast.error("Something went wrong");
                    return;
                }
            } finally {
                isLoadingRef.current = false;
                if (toastId !== undefined) toast.dismiss(toastId);
            }
        };
        
        handleRedirect();
    }, [router]);
}