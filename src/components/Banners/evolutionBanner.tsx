"use client"

import Image from "next/image"
import { useSingleGameRedirect } from "@/hooks/singGameRedirect"

export default function EvolutionBanner() {
  const handleGameRedirect = useSingleGameRedirect();

  return (
    <div className="relative w-full max-w-[382px] h-[168px] md:max-w-[500px] md:h-[220px] lg:max-w-[700px] lg:h-[300px] mx-auto overflow-hidden rounded-2xl style ">
      <Image src="/banner/evolution.png" alt="Evolution Banner" fill onClick={() => handleGameRedirect(1996, "Evolution")} className="cursor-pointer" />
    </div>
  )
}
