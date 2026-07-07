// Tipos que espelham exatamente as tabelas do Supabase.
// Sempre que o schema do banco mudar, atualize este arquivo.

export type Operacao = "venda" | "lancamento";

export type StatusImovel =
  | "disponivel"
  | "reservado"
  | "vendido"
  | "inativo";

export type RolePerfil = "admin" | "corretor";

export type StatusLead = "novo" | "em_atendimento" | "convertido" | "perdido";

export interface Cidade {
  id: string;
  nome: string;
  uf: string;
  slug: string;
  created_at: string;
}

export interface Bairro {
  id: string;
  cidade_id: string;
  nome: string;
  slug: string;
  created_at: string;
}

export interface Condominio {
  id: string;
  bairro_id: string;
  nome: string;
  descricao: string | null;
  created_at: string;
}

export interface TipoImovel {
  id: string;
  nome: string;
  slug: string;
  icone: string | null;
  ordem: number;
}

export interface Caracteristica {
  id: string;
  nome: string;
  icone: string | null;
  ordem: number;
}

export interface Imagem {
  id: string;
  imovel_id: string;
  url: string;
  path: string;
  ordem: number;
  capa: boolean;
  created_at: string;
}

export interface Perfil {
  id: string;
  nome: string;
  telefone: string | null;
  avatar_url: string | null;
  role: RolePerfil;
  ativo: boolean;
  created_at: string;
}

export interface Imovel {
  id: string;
  codigo: string;
  titulo: string;
  slug: string;
  descricao: string | null;

  tipo_id: string;
  operacao: Operacao;
  status: StatusImovel;

  preco: number | null;
  valor_condominio: number | null;
  valor_iptu: number | null;

  area_total: number | null;
  area_construida: number | null;
  quartos: number;
  suites: number;
  banheiros: number;
  vagas: number;

  cidade_id: string | null;
  bairro_id: string | null;
  condominio_id: string | null;
  endereco: string | null;
  latitude: number | null;
  longitude: number | null;

  destaque: boolean;
  corretor_id: string | null;
  visualizacoes: number;

  created_at: string;
  updated_at: string;
}

// Imóvel "montado" com os relacionamentos já resolvidos — o formato
// que a maior parte da UI do site vai consumir.
export interface ImovelCompleto extends Imovel {
  tipo: TipoImovel | null;
  cidade: Cidade | null;
  bairro: Bairro | null;
  condominio: Condominio | null;
  imagens: Imagem[];
  caracteristicas: Caracteristica[];
}

export interface Lead {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  mensagem: string | null;
  imovel_id: string | null;
  origem: string;
  status: StatusLead;
  created_at: string;
}

export interface Banner {
  id: string;
  titulo: string;
  imagem_url: string;
  link: string | null;
  ordem: number;
  ativo: boolean;
  created_at: string;
}
