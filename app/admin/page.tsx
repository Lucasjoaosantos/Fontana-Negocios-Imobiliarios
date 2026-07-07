import Link from "next/link";
import { Building2, Star, MessageSquare, Plus } from "lucide-react";
import { getEstatisticas } from "@/services/admin";

export default async function AdminDashboard() {
  const stats = await getEstatisticas();

  const cartoes = [
    { label: "Imóveis cadastrados", valor: stats.totalImoveis, icon: Building2 },
    { label: "Em destaque", valor: stats.destaques, icon: Star },
    { label: "Leads novos", valor: stats.leadsNovos, icon: MessageSquare },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
        <Link
          href="/admin/imoveis/novo"
          className="flex items-center gap-2 rounded-sm bg-navy px-4 py-2.5 font-display text-sm font-medium text-white hover:bg-ink"
        >
          <Plus size={16} />
          Novo imóvel
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cartoes.map(({ label, valor, icon: Icon }) => (
          <div key={label} className="rounded-sm border border-ink/10 bg-white p-6">
            <Icon className="text-brass" size={22} />
            <p className="font-display mt-4 text-3xl font-semibold text-ink">{valor}</p>
            <p className="mt-1 text-sm text-ink/60">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-sm border border-ink/10 bg-white p-6">
        <h2 className="font-display mb-2 text-sm font-semibold text-ink">
          Bem-vindo à área do corretor
        </h2>
        <p className="text-sm text-ink/60">
          Use o menu ao lado para cadastrar novos imóveis, subir fotos e
          gerenciar o que aparece no site. Alterações feitas aqui aparecem no
          site em poucos segundos.
        </p>
      </div>
    </div>
  );
}
