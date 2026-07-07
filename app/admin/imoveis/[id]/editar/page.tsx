import { notFound } from "next/navigation";
import { getImovelParaEdicao, getTiposImovel, getCaracteristicas } from "@/services/admin";
import { atualizarImovel } from "@/app/admin/imoveis/actions";
import { ImovelForm } from "@/features/admin/components/ImovelForm";
import { PhotoManager } from "@/features/admin/components/PhotoManager";

export default async function EditarImovelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [imovel, tipos, caracteristicas] = await Promise.all([
    getImovelParaEdicao(id),
    getTiposImovel(),
    getCaracteristicas(),
  ]);

  if (!imovel) notFound();

  const salvar = atualizarImovel.bind(null, id);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{imovel.titulo}</h1>
          <p className="font-mono-data mt-1 text-xs text-ink/50">{imovel.codigo}</p>
        </div>
      </div>

      <div className="mb-10 rounded-sm border border-ink/10 bg-white p-6">
        <h2 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Fotos
        </h2>
        <PhotoManager imovelId={id} imagens={imovel.imagens ?? []} />
      </div>

      <div className="rounded-sm border border-ink/10 bg-white p-6">
        <ImovelForm
          tipos={tipos}
          caracteristicasDisponiveis={caracteristicas}
          aoSalvar={salvar}
          textoBotao="Salvar alterações"
          valoresIniciais={{
            titulo: imovel.titulo,
            descricao: imovel.descricao ?? "",
            tipoId: imovel.tipo_id,
            operacao: imovel.operacao,
            status: imovel.status,
            preco: imovel.preco?.toString() ?? "",
            valorCondominio: imovel.valor_condominio?.toString() ?? "",
            valorIptu: imovel.valor_iptu?.toString() ?? "",
            areaTotal: imovel.area_total?.toString() ?? "",
            areaConstruida: imovel.area_construida?.toString() ?? "",
            quartos: imovel.quartos?.toString() ?? "0",
            suites: imovel.suites?.toString() ?? "0",
            banheiros: imovel.banheiros?.toString() ?? "0",
            vagas: imovel.vagas?.toString() ?? "0",
            cidade: imovel.cidade?.nome ?? "",
            uf: imovel.cidade?.uf ?? "SC",
            bairro: imovel.bairro?.nome ?? "",
            condominio: imovel.condominio?.nome ?? "",
            endereco: imovel.endereco ?? "",
            destaque: imovel.destaque,
            caracteristicas: (imovel.imovel_caracteristicas ?? []).map(
              (c: any) => c.caracteristica_id
            ),
          }}
        />
      </div>
    </div>
  );
}
