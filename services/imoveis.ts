import { createClient } from "@/lib/supabase/server";
import type { ImovelCompleto, Operacao } from "@/types/database";

const SELECT_COMPLETO = `
  *,
  tipo:tipos_imovel(*),
  cidade:cidades(*),
  bairro:bairros(*),
  condominio:condominios(*),
  imagens(*),
  imovel_caracteristicas(caracteristica:caracteristicas(*))
`;

// Achata o retorno do Supabase (que vem com o array intermediário
// imovel_caracteristicas) para o formato ImovelCompleto usado na UI.
function normalizar(registro: any): ImovelCompleto {
  return {
    ...registro,
    imagens: (registro.imagens ?? []).sort((a: any, b: any) => a.ordem - b.ordem),
    caracteristicas: (registro.imovel_caracteristicas ?? []).map(
      (ic: any) => ic.caracteristica
    ),
  };
}

export async function getImoveisDestaque(limite = 6): Promise<ImovelCompleto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("imoveis")
    .select(SELECT_COMPLETO)
    .eq("destaque", true)
    .neq("status", "inativo")
    .order("created_at", { ascending: false })
    .limit(limite);

  if (error) {
    console.error("Erro ao buscar imóveis em destaque:", error.message);
    return [];
  }
  return (data ?? []).map(normalizar);
}

export async function getImoveisLancamentos(limite = 8): Promise<ImovelCompleto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("imoveis")
    .select(SELECT_COMPLETO)
    .eq("operacao", "lancamento")
    .eq("destaque", false)
    .neq("status", "inativo")
    .order("created_at", { ascending: false })
    .limit(limite);

  if (error) {
    console.error("Erro ao buscar imóveis em lançamento:", error.message);
    return [];
  }
  return (data ?? []).map(normalizar);
}

export async function getImoveisRecentes(limite = 8): Promise<ImovelCompleto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("imoveis")
    .select(SELECT_COMPLETO)
    .neq("status", "inativo")
    .order("created_at", { ascending: false })
    .limit(limite);

  if (error) {
    console.error("Erro ao buscar imóveis recentes:", error.message);
    return [];
  }
  return (data ?? []).map(normalizar);
}

export interface FiltrosImoveis {
  operacao?: Operacao;
  tipoId?: string;
  cidadeId?: string;
  bairroId?: string;
  precoMin?: number;
  precoMax?: number;
  quartos?: number;
  busca?: string;
  pagina?: number;
  porPagina?: number;
}

export async function getImoveis(filtros: FiltrosImoveis = {}) {
  const supabase = await createClient();
  const { pagina = 1, porPagina = 12 } = filtros;
  const de = (pagina - 1) * porPagina;
  const ate = de + porPagina - 1;

  let query = supabase
    .from("imoveis")
    .select(SELECT_COMPLETO, { count: "exact" })
    .neq("status", "inativo");

  if (filtros.operacao) query = query.eq("operacao", filtros.operacao);
  if (filtros.tipoId) query = query.eq("tipo_id", filtros.tipoId);
  if (filtros.cidadeId) query = query.eq("cidade_id", filtros.cidadeId);
  if (filtros.bairroId) query = query.eq("bairro_id", filtros.bairroId);
  if (filtros.precoMin) query = query.gte("preco", filtros.precoMin);
  if (filtros.precoMax) query = query.lte("preco", filtros.precoMax);
  if (filtros.quartos) query = query.gte("quartos", filtros.quartos);
  if (filtros.busca) {
    const termo = filtros.busca.replace(/[%,]/g, "");
    query = query.or(`titulo.ilike.%${termo}%,codigo.ilike.%${termo}%`);
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(de, ate);

  if (error) {
    console.error("Erro ao buscar imóveis:", error.message);
    return { imoveis: [] as ImovelCompleto[], total: 0 };
  }

  return { imoveis: (data ?? []).map(normalizar), total: count ?? 0 };
}

export async function getImovelPorSlug(slug: string): Promise<ImovelCompleto | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("imoveis")
    .select(SELECT_COMPLETO)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return normalizar(data);
}

export async function getCidades() {
  const supabase = await createClient();
  const { data } = await supabase.from("cidades").select("*").order("nome");
  return data ?? [];
}

export async function getBairrosPorCidade(cidadeId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bairros")
    .select("*")
    .eq("cidade_id", cidadeId)
    .order("nome");
  return data ?? [];
}

export async function getTiposImovel() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tipos_imovel")
    .select("*")
    .order("ordem");
  return data ?? [];
}
