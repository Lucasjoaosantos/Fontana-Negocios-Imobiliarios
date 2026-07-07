import Image from "next/image";
import { ShieldCheck, Handshake, Sparkles } from "lucide-react";
import { SearchBar } from "./SearchBar";

const diferenciais = [
  {
    icon: ShieldCheck,
    label: "Negócios seguros e transparentes",
  },
  {
    icon: Handshake,
    label: "Atendimento próximo do início ao fim",
  },
  {
    icon: Sparkles,
    label: "Melhores oportunidades com inteligência",
  },
];

export function Hero() {
  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/0 via-navy/30 to-navy" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:px-8 lg:py-24">
        {/* Coluna de texto + busca */}
        <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Marca d'água: logo ampliada e borrada, atrás do texto */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center overflow-visible lg:justify-start">
            <Image
              src="/brand/logo-fontana-transparent.png"
              alt=""
              width={900}
              height={900}
              className="mt-[-15%] w-[85%] max-w-2xl scale-125 opacity-[0.10] blur-2xl sm:w-[60%] lg:mt-[-20%] lg:w-[70%]"
              aria-hidden="true"
            />
          </div>

          <span className="font-mono-data mb-4 text-xs uppercase tracking-[0.2em] text-brass-light">
            Fontana Negócios Imobiliários
          </span>

          <h1 className="font-display max-w-xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Conectamos o futuro, realizando sonhos.
          </h1>

          <p className="mt-5 max-w-md text-base text-white/70 sm:text-lg">
            Encontre o imóvel certo para comprar ou investir — com curadoria,
            dados claros e atendimento próximo do início ao fim.
          </p>

          <div className="mt-10 w-full">
            <SearchBar />
          </div>

          <div className="mt-8 flex w-full flex-col flex-wrap gap-4 sm:flex-row sm:justify-center lg:justify-start">
            {diferenciais.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 text-left"
              >
                <Icon size={18} className="shrink-0 text-brass-light" />
                <span className="font-display text-sm text-white/80">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna da foto + citação */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src="/team/corretor-fontana.jpg"
              alt="Corretor Fontana Negócios Imobiliários"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          </div>

          {/* Cartão de citação sobreposto */}
          <div className="relative z-10 mx-auto -mt-14 w-[85%] rounded-sm border border-white/10 bg-navy/95 p-5 shadow-xl backdrop-blur sm:-mt-16 sm:w-4/5 lg:-mt-12 lg:ml-[-1.5rem] lg:mr-auto lg:w-[90%]">
            <span className="font-display block text-3xl leading-none text-brass-light">
              &ldquo;
            </span>
            <p className="font-display -mt-2 text-sm text-white/85 sm:text-base">
              Nosso compromisso é transformar planos em conquistas reais.
            </p>
            <p className="font-mono-data mt-3 text-xs uppercase tracking-[0.15em] text-brass-light">
              Fontana
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
