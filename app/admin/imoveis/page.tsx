import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getImoveisAdmin } from "@/services/admin";
import { formatarPreco } from "@/lib/utils";
import { BotaoExcluirImovel } from "@/features/admin/components/BotaoExcluirImovel";

const statusLabel: Record<string, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  vendido: "Vendido",
  inativo: "Inativo",
};

const statusCor: Record<string, string> = {
  disponivel: "bg-green-100 text-green-700",
  reservado: "bg-brass/10 text-brass",
  vendido: "bg-ink/10 text-ink/60",
  inativo: "bg-danger/10 text-danger",
};

export default async function AdminImoveisPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string }>;
}) {
  const { salvo } = await searchParams;
  const imoveis = await getImoveisAdmin();

  return (
    <div>
      {salvo && (
        <div className="mb-6 rounded-sm bg-green-50 px-4 py-3 text-sm text-green-700">
          Imóvel salvo com sucesso.
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink">Imóveis</h1>
        <Link
          href="/admin/imoveis/novo"
          className="flex items-center gap-2 rounded-sm bg-navy px-4 py-2.5 font-display text-sm font-medium text-white hover:bg-ink"
        >
          <Plus size={16} />
          Novo imóvel
        </Link>
      </div>

      {imoveis.length === 0 ? (
        <div className="rounded-sm border border-dashed border-ink/20 bg-paper-dim/50 py-16 text-center">
          <p className="text-sm text-ink/60">Nenhum imóvel cadastrado ainda.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-ink/10 bg-paper-dim/40 text-left text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Imóvel</th>
                <th className="px-4 py-3 font-medium">Código</th>
                <th className="px-4 py-3 font-medium">Cidade</th>
                <th className="px-4 py-3 font-medium">Preço</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel: any) => {
                const capa =
                  imovel.imagens?.find((i: any) => i.capa) ?? imovel.imagens?.[0];
                return (
                  <tr key={imovel.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-sm bg-paper-dim">
                          {capa ? (
                            <Image src={capa.url} alt="" fill className="object-cover" sizes="56px" />
                          ) : null}
                        </div>
                        <span className="line-clamp-1 font-medium text-ink">{imovel.titulo}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono-data text-xs text-ink/60">
                      {imovel.codigo}
                    </td>
                    <td className="px-4 py-3 text-ink/70">
                      {imovel.cidade?.nome ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-ink/70">{formatarPreco(imovel.preco)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-sm px-2 py-1 text-xs font-medium ${statusCor[imovel.status]}`}
                      >
                        {statusLabel[imovel.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/imoveis/${imovel.id}/editar`}
                          className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/50 hover:bg-paper-dim hover:text-ink"
                        >
                          <Pencil size={15} />
                        </Link>
                        <BotaoExcluirImovel id={imovel.id} titulo={imovel.titulo} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
