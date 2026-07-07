import { getTiposImovel, getCaracteristicas } from "@/services/admin";
import { criarImovel } from "@/app/admin/imoveis/actions";
import { ImovelForm } from "@/features/admin/components/ImovelForm";

export default async function NovoImovelPage() {
  const [tipos, caracteristicas] = await Promise.all([
    getTiposImovel(),
    getCaracteristicas(),
  ]);

  return (
    <div>
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink">Novo imóvel</h1>
      <p className="mb-8 text-sm text-ink/60">
        Preencha os dados básicos. Depois de salvar, você poderá adicionar as
        fotos na tela de edição.
      </p>

      <ImovelForm
        tipos={tipos}
        caracteristicasDisponiveis={caracteristicas}
        aoSalvar={criarImovel}
        textoBotao="Salvar e continuar para fotos"
      />
    </div>
  );
}
