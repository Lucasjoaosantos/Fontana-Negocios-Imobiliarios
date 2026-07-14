import Image from "next/image";
import { ShieldCheck, Headphones, BarChart3, TrendingUp } from "lucide-react";
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
  {
    icon: TrendingUp,
    titulo: "Inteligência em investimento",
    descricao: "Investimento para o Futuro",
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
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
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
        <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
          <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-auto lg:h-full">
            <Image
              src="/team/corretor-fontana.jpg"
              alt="Corretor Fontana Negócios Imobiliários"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/0 to-navy/0 lg:bg-gradient-to-l lg:from-navy/0 lg:via-navy/0 lg:to-navy/10" />
            {/* Cartão de citação, flutuando sobre a foto em qualquer tela */}
            <div className="absolute bottom-4 left-4 right-4 z-10 rounded-sm border border-white/10 bg-navy/95 p-4 shadow-xl backdrop-blur sm:bottom-6 sm:right-6 sm:left-auto sm:w-[350px]">
              <span className="font-display block text-2xl leading-none text-brass-light">
                &ldquo;
              </span>
              <p className="font-display -mt-1 text-xs text-white/85 sm:text-sm">
                Nosso compromisso é transformar planos em conquistas reais.
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="font-display text-sm italic text-brass-light">
                  Fontana
                </p>
                <p className="font-display text-xs italic text-white/60">
                  CRECI SP 274725-F
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
