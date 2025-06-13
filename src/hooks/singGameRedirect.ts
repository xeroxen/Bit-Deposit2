import { apiRequest, isAuthenticated, redirectToLogin } from "@/lib/authentication";
import { useCallback } from "react";
import { toast } from "sonner";
import { ErrorResponse, SingleGameResponse } from "@/types/game.type";
import { useRouter } from "next/navigation";

export const useSingleGameRedirect = () => {
    const router = useRouter();
    
    return useCallback((gameId: number, gameName: string) => {
        if (!isAuthenticated()) {
            redirectToLogin()
            return
        }
        let toastId: string | number | undefined;
        
        const handleRedirect = async () => {
            try {
                toastId = toast.loading(`Loading ${gameName}...`);
                const response = await apiRequest<SingleGameResponse | ErrorResponse>(`/games/single/${gameId}`);
                
                // Check if response indicates authentication failure
                
                // Open game URL in a new tab
                if ('gameUrl' in response && response.gameUrl) {
                    toast.success(`${gameName} ready to play!`);
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
                    toast.error(`Please deposit to play ${gameName}`);
                    return;
                }
            } finally {
                if (toastId !== undefined) toast.dismiss(toastId);
            }
        };
        
        handleRedirect();
    }, [router]);
}