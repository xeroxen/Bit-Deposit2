"use client"

import Image from "next/image"
import { useSingleGameRedirect } from "@/hooks/singGameRedirect"

export default function EvolutionBanner() {
  const handleGameRedirect = useSingleGameRedirect();

  return (
    <div className="relative w-full max-w-[382px] h-[168px] mx-auto overflow-hidden rounded-2xl style ">
      <Image src="/banner/evolution.png" alt="Evolution Banner" fill onClick={() => handleGameRedirect(1996, "Evolution")} className="cursor-pointer" />
    </div>
  )
}
