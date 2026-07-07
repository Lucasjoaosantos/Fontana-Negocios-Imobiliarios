"use client";

import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { linkWhatsapp } from "@/lib/utils";

export function FloatingWhatsapp() {
  const [visivel, setVisivel] = useState(false);
  const [balaoAberto, setBalaoAberto] = useState(false);

  useEffect(() => {
    function aoRolar() {
      setVisivel(window.scrollY > window.innerHeight * 0.5);
    }
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });

    // Depois de aparecer, abre o balão de fala sozinho para chamar atenção
    const timer = setTimeout(() => setBalaoAberto(true), 3500);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {balaoAberto && (
        <div className="relative max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm text-ink shadow-xl">
          <button
            type="button"
            onClick={() => setBalaoAberto(false)}
            aria-label="Fechar"
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] text-white"
          >
            ×
          </button>
          Precisa de ajuda para encontrar um imóvel? Fale com o corretor agora! 👋
        </div>
      )}

      <a
        href={linkWhatsapp("Olá! Vi o site Fontana Negócios Imobiliários e gostaria de mais informações.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60" />
        <span className="absolute inset-0 rounded-full bg-[#25D366]" />
        <span className="relative text-white">
          <WhatsappIcon size={28} />
        </span>
      </a>
    </div>
  );
}