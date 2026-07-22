"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Imagem {
  id: string;
  url: string;
}

export function PropertyGallery({ imagens, titulo }: { imagens: Imagem[]; titulo: string }) {
  const [ativa, setAtiva] = useState(0);
  const [tela_cheia, setTelaCheia] = useState(false);

  const anterior = useCallback(() => {
    setAtiva((i) => (imagens.length === 0 ? 0 : i === 0 ? imagens.length - 1 : i - 1));
  }, [imagens.length]);

  const proxima = useCallback(() => {
    setAtiva((i) => (imagens.length === 0 ? 0 : i === imagens.length - 1 ? 0 : i + 1));
  }, [imagens.length]);

  // Trava o scroll do body e habilita navegação por teclado enquanto o modal está aberto
  useEffect(() => {
    if (!tela_cheia) return;

    const scrollOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") setTelaCheia(false);
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
    }

    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = scrollOriginal;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [tela_cheia, anterior, proxima]);

  if (imagens.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-sm bg-paper-dim">
        <span className="font-mono-data text-sm text-ink/40">Sem fotos</span>
      </div>
    );
  }

  return (
    <div>
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-paper-dim">
        <button
          type="button"
          onClick={() => setTelaCheia(true)}
          aria-label="Ver foto em tela cheia"
          className="absolute inset-0 h-full w-full cursor-zoom-in"
        >
          <Image
            src={imagens[ativa].url}
            alt={titulo}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </button>

        {imagens.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                anterior();
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-all hover:bg-white hover:scale-105"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                proxima();
              }}
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
              onClick={() => {
                setAtiva(i);
                setTelaCheia(true);
              }}
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

      {tela_cheia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-6"
          onClick={() => setTelaCheia(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTelaCheia(false);
            }}
            aria-label="Fechar"
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X size={24} />
          </button>

          <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white sm:top-6">
            {ativa + 1} / {imagens.length}
          </div>

          <div
            className="relative z-10 flex h-full w-full max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[85vh] w-full">
              <Image
                src={imagens[ativa].url}
                alt={titulo}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {imagens.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    anterior();
                  }}
                  aria-label="Foto anterior"
                  className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4 sm:h-12 sm:w-12"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    proxima();
                  }}
                  aria-label="Próxima foto"
                  className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4 sm:h-12 sm:w-12"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
