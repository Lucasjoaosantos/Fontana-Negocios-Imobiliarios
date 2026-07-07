"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function acharOuCriarCidade(nome: string, uf: string) {
  const supabase = await createClient();
  const slug = slugify(nome);

  const { data: existente } = await supabase
    .from("cidades")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (existente) return existente.id;

  const { data: nova, error } = await supabase
    .from("cidades")
    .insert({ nome, uf: uf.toUpperCase(), slug })
    .select("id")
    .single();
  if (error) throw new Error(`Erro ao criar cidade: ${error.message}`);
  return nova.id;
}

async function acharOuCriarBairro(nome: string, cidadeId: string) {
  const supabase = await createClient();
  const slug = slugify(nome);

  const { data: existente } = await supabase
    .from("bairros")
    .select("id")
    .eq("slug", slug)
    .eq("cidade_id", cidadeId)
    .maybeSingle();
  if (existente) return existente.id;

  const { data: novo, error } = await supabase
    .from("bairros")
    .insert({ nome, slug, cidade_id: cidadeId })
    .select("id")
    .single();
  if (error) throw new Error(`Erro ao criar bairro: ${error.message}`);
  return novo.id;
}

async function acharOuCriarCondominio(nome: string, bairroId: string) {
  if (!nome.trim()) return null;
  const supabase = await createClient();

  const { data: existente } = await supabase
    .from("condominios")
    .select("id")
    .ilike("nome", nome.trim())
    .eq("bairro_id", bairroId)
    .maybeSingle();
  if (existente) return existente.id;

  const { data: novo, error } = await supabase
    .from("condominios")
    .insert({ nome: nome.trim(), bairro_id: bairroId })
    .select("id")
    .single();
  if (error) throw new Error(`Erro ao criar condomínio: ${error.message}`);
  return novo.id;
}

async function proximoCodigo() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("imoveis")
    .select("*", { count: "exact", head: true });
  const numero = (count ?? 0) + 1;
  return `FT${String(numero).padStart(4, "0")}`;
}

export interface ImovelFormData {
  titulo: string;
  descricao: string;
  tipoId: string;
  operacao: "venda" | "lancamento";
  status: "disponivel" | "reservado" | "vendido" | "inativo";
  preco: string;
  valorCondominio: string;
  valorIptu: string;
  areaTotal: string;
  areaConstruida: string;
  quartos: string;
  suites: string;
  banheiros: string;
  vagas: string;
  cidade: string;
  uf: string;
  bairro: string;
  condominio: string;
  endereco: string;
  destaque: boolean;
  caracteristicas: string[];
}

function num(valor: string) {
  if (!valor || valor.trim() === "") return null;
  const n = Number(valor.replace(",", "."));
  return Number.isNaN(n) ? null : n;
}

async function montarPayload(dados: ImovelFormData) {
  const cidadeId = await acharOuCriarCidade(dados.cidade, dados.uf);
  const bairroId = await acharOuCriarBairro(dados.bairro, cidadeId);
  const condominioId = await acharOuCriarCondominio(dados.condominio, bairroId);

  return {
    titulo: dados.titulo,
    descricao: dados.descricao || null,
    tipo_id: dados.tipoId,
    operacao: dados.operacao,
    status: dados.status,
    preco: num(dados.preco),
    valor_condominio: num(dados.valorCondominio),
    valor_iptu: num(dados.valorIptu),
    area_total: num(dados.areaTotal),
    area_construida: num(dados.areaConstruida),
    quartos: num(dados.quartos) ?? 0,
    suites: num(dados.suites) ?? 0,
    banheiros: num(dados.banheiros) ?? 0,
    vagas: num(dados.vagas) ?? 0,
    cidade_id: cidadeId,
    bairro_id: bairroId,
    condominio_id: condominioId,
    endereco: dados.endereco || null,
    destaque: dados.destaque,
  };
}

export async function criarImovel(dados: ImovelFormData) {
  const supabase = await createClient();
  const payload = await montarPayload(dados);
  const codigo = await proximoCodigo();
  const slug = `${slugify(dados.titulo)}-${codigo.toLowerCase()}`;

  const { data: imovel, error } = await supabase
    .from("imoveis")
    .insert({ ...payload, codigo, slug })
    .select("id")
    .single();

  if (error) throw new Error(`Erro ao criar imóvel: ${error.message}`);

  if (dados.caracteristicas.length > 0) {
    await supabase.from("imovel_caracteristicas").insert(
      dados.caracteristicas.map((cid) => ({
        imovel_id: imovel.id,
        caracteristica_id: cid,
      }))
    );
  }

  revalidatePath("/admin/imoveis");
  redirect(`/admin/imoveis/${imovel.id}/editar`);
}

export async function atualizarImovel(id: string, dados: ImovelFormData) {
  const supabase = await createClient();
  const payload = await montarPayload(dados);

  const { error } = await supabase.from("imoveis").update(payload).eq("id", id);
  if (error) throw new Error(`Erro ao atualizar imóvel: ${error.message}`);

  await supabase.from("imovel_caracteristicas").delete().eq("imovel_id", id);
  if (dados.caracteristicas.length > 0) {
    await supabase.from("imovel_caracteristicas").insert(
      dados.caracteristicas.map((cid) => ({
        imovel_id: id,
        caracteristica_id: cid,
      }))
    );
  }

  revalidatePath("/admin/imoveis");
  revalidatePath(`/admin/imoveis/${id}/editar`);
}

export async function excluirImovel(id: string) {
  const supabase = await createClient();

  // Remove as fotos do storage antes de excluir o registro
  const { data: imagens } = await supabase
    .from("imagens")
    .select("path")
    .eq("imovel_id", id);

  if (imagens && imagens.length > 0) {
    await supabase.storage.from("imoveis").remove(imagens.map((i) => i.path));
  }

  const { error } = await supabase.from("imoveis").delete().eq("id", id);
  if (error) throw new Error(`Erro ao excluir imóvel: ${error.message}`);

  revalidatePath("/admin/imoveis");
}

export async function definirCapa(imovelId: string, imagemId: string) {
  const supabase = await createClient();
  await supabase.from("imagens").update({ capa: false }).eq("imovel_id", imovelId);
  await supabase.from("imagens").update({ capa: true }).eq("id", imagemId);
  revalidatePath(`/admin/imoveis/${imovelId}/editar`);
}

export async function excluirImagem(imovelId: string, imagemId: string, path: string) {
  const supabase = await createClient();
  await supabase.storage.from("imoveis").remove([path]);
  await supabase.from("imagens").delete().eq("id", imagemId);
  revalidatePath(`/admin/imoveis/${imovelId}/editar`);
}
