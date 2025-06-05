import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest, isAuthenticated, triggerBalanceUpdate } from '@/lib/authentication';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  teamName: string;
  teamId: number;
  odd: number;
}

interface ApiErrorResponse {
  error: string;
}

interface ApiError {
  error: string;
  [key: string]: unknown;
}

export function BetModal({ isOpen, onClose, matchId, teamName, teamId, odd }: BetModalProps) {
  const [amount, setAmount] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleBet = async () => {
    if (!isAuthenticated()) {
      toast.error("Please login to place a bet");
      router.push('/login');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await apiRequest<ApiErrorResponse>('/bet', {
        method: 'POST',
        body: JSON.stringify({
          match_id: parseInt(matchId),
          team_id: teamId,
          odd: odd,
          ammount: Number(amount)
        })
      });
      
      // Trigger balance update event after successful bet
      triggerBalanceUpdate();
      
      onClose();
      toast.success("Bet placed successfully!");
    } catch (error: unknown) {
      // Handle the error response from the API
      if (error && typeof error === 'object' && 'error' in error) {
        const apiError = error as ApiError;
        setError(apiError.error);
        toast.error(apiError.error);
      } else if (typeof error === 'string') {
        setError(error);
        toast.error(error);
      } else {
        setError("An error occurred while placing the bet");
        toast.error("An error occurred while placing the bet");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1e2e3d] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Place Bet</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-300">Team</p>
            <p className="text-lg font-semibold text-white">{teamName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-300">Odds</p>
            <p className="text-lg font-semibold text-white">{odd.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-gray-300">
              Bet Amount
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-[#2a3b4d] border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-white border-gray-600 hover:bg-[#2a3b4d] hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBet} 
            disabled={isLoading}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-800"
          >
            {isLoading ? "Placing Bet..." : "Place Bet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 