import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Car, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatarPreco, rotuloOperacao } from "@/lib/utils";
import type { ImovelCompleto } from "@/types/database";

export function PropertyCard({ imovel }: { imovel: ImovelCompleto }) {
  const capa =
    imovel.imagens.find((img) => img.capa) ?? imovel.imagens[0] ?? null;

  return (
    <Link
      href={`/imovel/${imovel.slug}`}
      className="group block overflow-hidden rounded-sm border border-ink/10 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-dim">
        {capa ? (
          <Image
            src={capa.url}
            alt={imovel.titulo}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/30">
            <span className="font-mono-data text-xs">Sem foto</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone="navy">{rotuloOperacao(imovel.operacao)}</Badge>
          {imovel.destaque && <Badge tone="brass">Destaque</Badge>}
        </div>
        <span className="absolute bottom-3 right-3 rounded-sm bg-ink/80 px-2 py-1 font-mono-data text-[11px] text-white">
          {imovel.codigo}
        </span>
      </div>

      <div className="p-4">
        <p className="font-mono-data text-xs uppercase tracking-wide text-ink/50">
          {imovel.bairro?.nome ?? ""}
          {imovel.bairro && imovel.cidade ? " · " : ""}
          {imovel.cidade?.nome ?? ""}
        </p>
        <h3 className="font-display mt-1 line-clamp-1 text-lg font-semibold text-ink">
          {imovel.titulo}
        </h3>
        <p className="font-display mt-2 text-xl font-semibold text-navy">
          {formatarPreco(imovel.preco)}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-ink/10 pt-3 text-sm text-ink/70">
          {imovel.area_total ? (
            <span className="flex items-center gap-1.5">
              <Ruler size={15} className="text-brass" />
              {imovel.area_total}m²
            </span>
          ) : null}
          {imovel.quartos ? (
            <span className="flex items-center gap-1.5">
              <BedDouble size={15} className="text-brass" />
              {imovel.quartos}
            </span>
          ) : null}
          {imovel.banheiros ? (
            <span className="flex items-center gap-1.5">
              <Bath size={15} className="text-brass" />
              {imovel.banheiros}
            </span>
          ) : null}
          {imovel.vagas ? (
            <span className="flex items-center gap-1.5">
              <Car size={15} className="text-brass" />
              {imovel.vagas}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
