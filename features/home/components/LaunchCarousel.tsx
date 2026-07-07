"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import type { ImovelCompleto } from "@/types/database";

export function LaunchCarousel({ imoveis }: { imoveis: ImovelCompleto[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direcao: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector("[data-carousel-item]") as HTMLElement | null;
    const passo = item ? item.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({
      left: direcao === "left" ? -passo : passo,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {imoveis.map((imovel) => (
          <div
            key={imovel.id}
            data-carousel-item
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <PropertyCard imovel={imovel} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Ver imóveis anteriores"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition hover:bg-ink/5"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Ver próximos imóveis"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition hover:bg-ink/5"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}