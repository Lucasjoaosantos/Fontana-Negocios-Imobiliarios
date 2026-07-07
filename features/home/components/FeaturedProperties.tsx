import { Building2 } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { LinkButton } from "@/components/ui/Button";
import { getImoveisDestaque } from "@/services/imoveis";

export async function FeaturedProperties() {
  const imoveis = await getImoveisDestaque();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-brass">
            🏆 Seleção Fontana 🥇
          </span>
          <h2 className="font-display mt-2 text-3xl font-semibold text-ink">
            Imóveis em destaque
          </h2>
        </div>
        <LinkButton href="/imoveis" variant="ghost" size="sm" className="border border-ink/15">
          Ver todos os imóveis
        </LinkButton>
      </div>

      {imoveis.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imoveis.map((imovel) => (
            <PropertyCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-ink/20 bg-paper-dim/60 py-16 text-center">
          <Building2 className="text-brass" size={28} />
          <p className="font-display text-lg font-medium text-ink">
            Os primeiros imóveis estão a caminho
          </p>
          <p className="max-w-sm text-sm text-ink/60">
            Assim que forem cadastrados no painel administrativo, eles
            aparecem aqui automaticamente.
          </p>
        </div>
      )}
    </section>
  );
}
