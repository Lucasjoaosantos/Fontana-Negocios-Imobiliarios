import Link from "next/link";
import { Search } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getImoveis, getCidades, getTiposImovel } from "@/services/imoveis";
import { cn } from "@/lib/utils";

const POR_PAGINA = 12;

interface SearchParams {
  operacao?: string;
  tipoId?: string;
  cidadeId?: string;
  precoMin?: string;
  precoMax?: string;
  quartos?: string;
  busca?: string;
  pagina?: string;
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const pagina = Number(params.pagina) || 1;

  const [{ imoveis, total }, cidades, tipos] = await Promise.all([
    getImoveis({
      operacao: params.operacao as any,
      tipoId: params.tipoId || undefined,
      cidadeId: params.cidadeId || undefined,
      precoMin: params.precoMin ? Number(params.precoMin) : undefined,
      precoMax: params.precoMax ? Number(params.precoMax) : undefined,
      quartos: params.quartos ? Number(params.quartos) : undefined,
      busca: params.busca || undefined,
      pagina,
      porPagina: POR_PAGINA,
    }),
    getCidades(),
    getTiposImovel(),
  ]);

  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  function paramsComPagina(novaPagina: number) {
    const p = new URLSearchParams();
    if (params.operacao) p.set("operacao", params.operacao);
    if (params.tipoId) p.set("tipoId", params.tipoId);
    if (params.cidadeId) p.set("cidadeId", params.cidadeId);
    if (params.precoMin) p.set("precoMin", params.precoMin);
    if (params.precoMax) p.set("precoMax", params.precoMax);
    if (params.quartos) p.set("quartos", params.quartos);
    if (params.busca) p.set("busca", params.busca);
    p.set("pagina", String(novaPagina));
    return `/imoveis?${p.toString()}`;
  }

  return (
    <div>
      <section className="blueprint-grid bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold text-white">
            Imóveis
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {total} {total === 1 ? "imóvel encontrado" : "imóveis encontrados"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <form
          method="get"
          className="mb-10 grid gap-4 rounded-sm border border-ink/10 bg-white p-5 sm:grid-cols-2 lg:grid-cols-6"
        >
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-ink/60">
              Buscar
            </label>
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                name="busca"
                defaultValue={params.busca}
                placeholder="Título ou código do imóvel"
                className="w-full rounded-sm border border-ink/15 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-brass"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">
              Operação
            </label>
            <select
              name="operacao"
              defaultValue={params.operacao ?? ""}
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
            >
              <option value="">Todas</option>
              <option value="venda">Compra</option>
              <option value="lancamento">Lançamento</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">
              Tipo
            </label>
            <select
              name="tipoId"
              defaultValue={params.tipoId ?? ""}
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
            >
              <option value="">Todos</option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">
              Cidade
            </label>
            <select
              name="cidadeId"
              defaultValue={params.cidadeId ?? ""}
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
            >
              <option value="">Todas</option>
              {cidades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">
              Quartos (mín.)
            </label>
            <select
              name="quartos"
              defaultValue={params.quartos ?? ""}
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
            >
              <option value="">Qualquer</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">
              Preço mín. (R$)
            </label>
            <input
              type="number"
              name="precoMin"
              defaultValue={params.precoMin}
              placeholder="0"
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">
              Preço máx. (R$)
            </label>
            <input
              type="number"
              name="precoMax"
              defaultValue={params.precoMax}
              placeholder="Sem limite"
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
            />
          </div>

          <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-2">
            <button
              type="submit"
              className="rounded-sm bg-navy px-6 py-2.5 font-display text-sm font-medium text-white hover:bg-ink"
            >
              Filtrar
            </button>
            <Link
              href="/imoveis"
              className="rounded-sm border border-ink/15 px-4 py-2.5 text-sm text-ink/60 hover:bg-paper-dim"
            >
              Limpar
            </Link>
          </div>
        </form>

        {imoveis.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-sm border border-dashed border-ink/20 bg-paper-dim/60 py-16 text-center">
            <p className="font-display text-lg font-medium text-ink">
              Nenhum imóvel encontrado
            </p>
            <p className="max-w-sm text-sm text-ink/60">
              Tente ajustar os filtros ou limpar a busca.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {imoveis.map((imovel) => (
                <PropertyCard key={imovel.id} imovel={imovel} />
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={paramsComPagina(p)}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-sm text-sm",
                      p === pagina
                        ? "bg-navy text-white"
                        : "border border-ink/15 text-ink/70 hover:bg-paper-dim"
                    )}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}