import { toast } from "sonner";

import { getAuthToken } from "@/lib/authentication";
import { Game } from "@/types/game.type";

export const addFavourite = async (game: Game)=>{
    const token = getAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favarate/${game.id}`, {
      method: 'Get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      toast.success('Game added to favourites');
    } else {
      toast.error('Failed to add game to favourites');
    }
  }