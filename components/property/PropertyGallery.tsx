"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  function anterior() {
    setAtiva((i) => (i === 0 ? imagens.length - 1 : i - 1));
  }

  function proxima() {
    setAtiva((i) => (i === imagens.length - 1 ? 0 : i + 1));
  }

  return (
    <div>
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-paper-dim">
        <Image
          src={imagens[ativa].url}
          alt={titulo}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />

        {imagens.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-all hover:bg-white hover:scale-105"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={proxima}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-all hover:bg-white hover:scale-105"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {ativa + 1} / {imagens.length}
            </div>
          </>
        )}
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
