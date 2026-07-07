import { createClient } from "@/lib/supabase/server";

export async function getUsuarioLogado() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: perfil } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, perfil };
}

export async function getEstatisticas() {
  const supabase = await createClient();

  const [{ count: totalImoveis }, { count: destaques }, { count: leadsNovos }] =
    await Promise.all([
      supabase.from("imoveis").select("*", { count: "exact", head: true }),
      supabase
        .from("imoveis")
        .select("*", { count: "exact", head: true })
        .eq("destaque", true),
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "novo"),
    ]);

  return {
    totalImoveis: totalImoveis ?? 0,
    destaques: destaques ?? 0,
    leadsNovos: leadsNovos ?? 0,
  };
}

export async function getImoveisAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("imoveis")
    .select(
      `*, tipo:tipos_imovel(*), cidade:cidades(*), bairro:bairros(*), imagens(*)`
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao listar imóveis (admin):", error.message);
    return [];
  }
  return data ?? [];
}

export async function getImovelParaEdicao(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("imoveis")
    .select(
      `*, cidade:cidades(*), bairro:bairros(*), condominio:condominios(*), imagens(*), imovel_caracteristicas(caracteristica_id)`
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getTiposImovel() {
  const supabase = await createClient();
  const { data } = await supabase.from("tipos_imovel").select("*").order("ordem");
  return data ?? [];
}

export async function getCaracteristicas() {
  const supabase = await createClient();
  const { data } = await supabase.from("caracteristicas").select("*").order("ordem");
  return data ?? [];
}
