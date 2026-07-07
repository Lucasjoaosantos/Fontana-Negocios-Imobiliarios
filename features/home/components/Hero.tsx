import Image from "next/image";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy">
      {/* Marca d'água: logo ampliada e borrada, só na área do texto */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
        <Image
          src="/brand/logo-fontana-transparent.png"
          alt=""
          width={900}
          height={900}
          className="mt-[-8%] w-[85%] max-w-3xl scale-125 opacity-[0.10] blur-2xl sm:w-[55%]"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/0 via-navy/40 to-navy" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <span className="font-mono-data mb-4 text-xs uppercase tracking-[0.2em] text-brass-light">
          Fontana Negócios Imobiliários
        </span>
        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          Conectamos o futuro, realizando sonhos.
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
          Encontre o imóvel certo para comprar ou investir — com
          curadoria, dados claros e atendimento próximo do início ao fim.
        </p>

        <div className="mt-10 flex w-full justify-center">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
