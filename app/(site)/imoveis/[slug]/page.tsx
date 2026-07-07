import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, BedDouble, Bath, Car, Ruler, MapPin } from "lucide-react";
import { getImovelPorSlug } from "@/services/imoveis";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { Badge } from "@/components/ui/Badge";
import { formatarPreco, rotuloOperacao, linkWhatsapp } from "@/lib/utils";

export default async function ImovelDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const imovel = await getImovelPorSlug(slug);

  if (!imovel) notFound();

  const mensagemWhatsapp = `Olá! Estou interessado no imóvel "${imovel.titulo}" (código ${imovel.codigo}) e gostaria de mais informações.`;

  const specs = [
    imovel.area_total ? { icon: Ruler, valor: `${imovel.area_total}m²`, label: "Área" } : null,
    imovel.quartos ? { icon: BedDouble, valor: imovel.quartos, label: "Quartos" } : null,
    imovel.banheiros ? { icon: Bath, valor: imovel.banheiros, label: "Banheiros" } : null,
    imovel.vagas ? { icon: Car, valor: imovel.vagas, label: "Vagas" } : null,
  ].filter(Boolean) as { icon: typeof Ruler; valor: string | number; label: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/imoveis"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
      >
        <ChevronLeft size={16} />
        Voltar para imóveis
      </Link>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyGallery imagens={imovel.imagens} titulo={imovel.titulo} />

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="navy">{rotuloOperacao(imovel.operacao)}</Badge>
              {imovel.destaque && <Badge tone="brass">Destaque</Badge>}
              <span className="font-mono-data text-xs text-ink/40">{imovel.codigo}</span>
            </div>

            <h1 className="font-display mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              {imovel.titulo}
            </h1>

            {(imovel.bairro || imovel.cidade) && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60">
                <MapPin size={15} className="text-brass" />
                {[imovel.bairro?.nome, imovel.cidade?.nome].filter(Boolean).join(", ")}
                {imovel.condominio ? ` — ${imovel.condominio.nome}` : ""}
              </p>
            )}

            {specs.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-6 border-y border-ink/10 py-5">
                {specs.map(({ icon: Icon, valor, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon size={20} className="text-brass" />
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">{valor}</p>
                      <p className="text-xs text-ink/50">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {imovel.descricao && (
              <div className="mt-6">
                <h2 className="font-display mb-2 text-sm font-semibold uppercase tracking-wide text-ink/60">
                  Descrição
                </h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-ink/80">
                  {imovel.descricao}
                </p>
              </div>
            )}

            {imovel.caracteristicas.length > 0 && (
              <div className="mt-6">
                <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide text-ink/60">
                  Características
                </h2>
                <div className="flex flex-wrap gap-2">
                  {imovel.caracteristicas.map((c) => (
                    <span
                      key={c.id}
                      className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70"
                    >
                      {c.nome}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {imovel.endereco && (
              <div className="mt-6">
                <h2 className="font-display mb-2 text-sm font-semibold uppercase tracking-wide text-ink/60">
                  Endereço
                </h2>
                <p className="text-sm text-ink/70">{imovel.endereco}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-sm border border-ink/10 bg-white p-6 shadow-sm">
            <p className="font-display text-2xl font-semibold text-navy">
              {formatarPreco(imovel.preco)}
            </p>
            {(imovel.valor_condominio || imovel.valor_iptu) && (
              <div className="mt-2 space-y-1 text-sm text-ink/60">
                {imovel.valor_condominio ? (
                  <p>Condomínio: {formatarPreco(imovel.valor_condominio)}</p>
                ) : null}
                {imovel.valor_iptu ? <p>IPTU: {formatarPreco(imovel.valor_iptu)}</p> : null}
              </div>
            )}

            
              href={linkWhatsapp(mensagemWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-sm bg-[#25D366] px-6 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:brightness-95"
            >
              Falar no WhatsApp
            </a>

            <p className="mt-3 text-center text-xs text-ink/40">
              Fale direto com um corretor sobre este imóvel específico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}