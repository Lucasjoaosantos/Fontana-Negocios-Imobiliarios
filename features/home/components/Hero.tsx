import Image from "next/image";
import { ShieldCheck, Headphones, BarChart3 } from "lucide-react";
import { SearchBar } from "./SearchBar";

const diferenciais = [
  {
    icon: ShieldCheck,
    titulo: "Segurança",
    descricao: "Negócios seguros e transparentes",
  },
  {
    icon: Headphones,
    titulo: "Atendimento próximo",
    descricao: "Do início ao fim com você",
  },
  {
    icon: BarChart3,
    titulo: "Melhores oportunidades",
    descricao: "Imóveis selecionados com inteligência",
  },
];

export function Hero() {
  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy">
      <div className="relative mx-auto grid max-w-7xl px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        {/* Coluna de texto + busca */}
        <div className="relative z-10 flex flex-col justify-center py-14 lg:py-20">
          <span className="font-mono-data mb-4 text-xs uppercase tracking-[0.2em] text-brass-light">
            Fontana Negócios Imobiliários
          </span>

          <h1 className="font-display max-w-lg text-4xl font-semibold leading-[1.12] text-white sm:text-5xl">
            Conectamos o futuro,
            <br />
            realizando sonhos.
          </h1>

          <p className="mt-5 max-w-md text-base text-white/70">
            Encontre o imóvel certo para comprar ou investir — com curadoria,
            dados claros e atendimento próximo do início ao fim.
          </p>

          <div className="mt-8 w-full max-w-lg">
            <SearchBar />
          </div>

          <div className="mt-8 flex flex-col flex-wrap gap-6 sm:flex-row sm:gap-8">
            {diferenciais.map(({ icon: Icon, titulo, descricao }) => (
              <div key={titulo} className="flex items-start gap-3">
                <Icon size={20} className="mt-0.5 shrink-0 text-brass-light" />
                <div>
                  <p className="font-display text-sm font-semibold text-white">
                    {titulo}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-white/60">
                    {descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna da foto, colada na borda direita e inferior da seção */}
        <div className="relative -mx-4 h-[320px] sm:-mx-6 sm:h-[420px] lg:mx-0 lg:h-auto">
          <Image
            src="/team/corretor-fontana.jpg"
            alt="Corretor Fontana Negócios Imobiliários"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/0 to-navy/0 lg:bg-gradient-to-l lg:from-navy/0 lg:via-navy/0 lg:to-navy/10" />

          {/* Cartão de citação, grudado no canto inferior */}
          <div className="absolute bottom-4 right-20 left-5 z-10 rounded-sm border border-white/10 bg-navy/95 p-4 shadow-xl backdrop-blur sm:bottom-6 sm:right-6 sm:left-auto sm:w-[340px]">
            <span className="font-display block text-2xl leading-none text-brass-light">
              &ldquo;
            </span>
            <p className="font-display -mt-1 text-xs text-white/85 sm:text-sm">
              Nosso compromisso é transformar planos em conquistas reais.
            </p>
            <p className="font-display mt-2 text-sm italic text-brass-light">
              Fontana
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
