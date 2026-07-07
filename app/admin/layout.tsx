import { getUsuarioLogado } from "@/services/admin";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessao = await getUsuarioLogado();

  if (!sessao) {
    return <div className="min-h-screen bg-navy">{children}</div>;
  }

  const nomeUsuario = sessao.perfil?.nome ?? sessao.user.email ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-paper lg:flex-row">
      <AdminSidebar nomeUsuario={nomeUsuario} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
