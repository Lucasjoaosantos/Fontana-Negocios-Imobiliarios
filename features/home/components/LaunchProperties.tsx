import { LinkButton } from "@/components/ui/Button";
import { getImoveisLancamentos } from "@/services/imoveis";
import { LaunchCarousel } from "./LaunchCarousel";

export async function LaunchProperties() {
  const imoveis = await getImoveisLancamentos();

  if (imoveis.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-brass">
            🏠 Confira também
          </span>
          <h2 className="font-display mt-2 text-3xl font-semibold text-ink">
            Mais imóveis disponíveis
          </h2>
        </div>
        <LinkButton href="/imoveis" variant="ghost" size="sm" className="border border-ink/15">
          Ver todos os imóveis
        </LinkButton>
      </div>
      <LaunchCarousel imoveis={imoveis} />
    </section>
  );
}
