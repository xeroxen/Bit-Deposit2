"use client"

import Image from "next/image"

export default function EvolutionBanner() {
  return (
    <div className="relative w-full max-w-[382px] h-[168px] mx-auto overflow-hidden rounded-2xl style ">
      <Image src="/banner/evolution.png" alt="Evolution Banner" fill />
    </div>
  )
}
