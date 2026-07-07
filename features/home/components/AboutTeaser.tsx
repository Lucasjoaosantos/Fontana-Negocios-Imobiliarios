import { ShieldCheck, Clock, Handshake } from "lucide-react";

const pilares = [
  {
    icon: ShieldCheck,
    titulo: "Segurança jurídica",
    texto: "Documentação e contratos conferidos em cada etapa da negociação.",
  },
  {
    icon: Clock,
    titulo: "Processo ágil",
    texto: "Acompanhamento próximo, do primeiro contato até a chave na mão.",
  },
  {
    icon: Handshake,
    titulo: "Atendimento humano",
    texto: "Um corretor dedicado entende sua necessidade antes de indicar imóveis.",
  },
];

export function AboutTeaser() {
  return (
    <section className="bg-paper-dim/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-brass">
              Sobre a Fontana
            </span>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink">
              Negócios imobiliários com propósito
            </h2>
            <p className="mt-4 text-ink/70">
              A Fontana Negócios Imobiliários nasceu para simplificar a compra
              e venda de imóveis — conectando quem procura um lugar para
              viver ou investir com quem conhece o mercado local de verdade.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {pilares.map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="rounded-sm border border-ink/10 bg-white p-5">
                <Icon className="text-brass" size={22} />
                <h3 className="font-display mt-3 text-sm font-semibold text-ink">
                  {titulo}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}