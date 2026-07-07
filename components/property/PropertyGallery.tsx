"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Imagem {
  id: string;
  url: string;
}

export function PropertyGallery({ imagens, titulo }: { imagens: Imagem[]; titulo: string }) {
  const [ativa, setAtiva] = useState(0);

  if (imagens.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-sm bg-paper-dim">
        <span className="font-mono-data text-sm text-ink/40">Sem fotos</span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-paper-dim">
        <Image
          src={imagens[ativa].url}
          alt={titulo}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>

      {imagens.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3 sm:grid-cols-6">
          {imagens.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setAtiva(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-sm border-2 transition-colors",
                i === ativa ? "border-brass" : "border-transparent"
              )}
            >
              <Image src={img.url} alt="" fill className="object-cover" sizes="100px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}