import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Building2, Plus, ExternalLink } from "lucide-react";
import { getUsuarioLogado } from "@/services/admin";
import { BotaoSair } from "@/features/admin/components/BotaoSair";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessao = await getUsuarioLogado();

  // A tela de login usa o próprio layout root (fora deste grupo protegido),
  // então quando não há sessão o middleware já redirecionou antes de chegar
  // aqui — isto é só uma segunda camada de segurança.
  if (!sessao) {
    return <div className="min-h-screen bg-navy">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="flex w-64 shrink-0 flex-col bg-navy text-white">
        <div className="p-5">
          <Image
            src="/brand/logo-fontana-transparent.png"
            alt="Fontana"
            width={180}
            height={180}
            className="h-14 w-auto"
          />
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>
          <Link
            href="/admin/imoveis"
            className="flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
          >
            <Building2 size={17} />
            Imóveis
          </Link>
          <Link
            href="/admin/imoveis/novo"
            className="flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
          >
            <Plus size={17} />
            Novo imóvel
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
          >
            <ExternalLink size={17} />
            Ver site
          </Link>
        </nav>

        <div className="border-t border-white/10 p-3">
          <p className="px-3 pb-2 text-xs text-white/50">
            {sessao.perfil?.nome ?? sessao.user.email}
          </p>
          <BotaoSair />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl p-8">{children}</div>
      </main>
    </div>
  );
}
