import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatarPreco(valor: number | null | undefined) {
  if (valor === null || valor === undefined) return "Consulte";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatarArea(valor: number | null | undefined) {
  if (!valor) return null;
  return `${valor.toLocaleString("pt-BR")} m²`;
}

export function rotuloOperacao(operacao: string) {
  const mapa: Record<string, string> = {
    venda: "Compra",
    lancamento: "Lançamentos (Na Planta)",
  };
  return mapa[operacao] ?? operacao;
}

// Número oficial de WhatsApp da imobiliária — troque aqui quando tiver o
// número real. Formato: código do país + DDD + número, só dígitos.
export const WHATSAPP_NUMERO = "55016982178109";
export const TELEFONE_EXIBICAO = "(16) 9 8217-8109";

// Troque pelo @ real do Instagram da Fontana.
export const INSTAGRAM_URL = "https://www.instagram.com/fontanaalexi?igsh=MXA0MWZyc250bzZ1Nw==";

export function linkWhatsapp(mensagem?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

// O login do painel usa um "usuário" simples (ex: admin), mas por baixo dos
// panos o Supabase Auth exige um email — completamos com esse domínio fixo
// sem o corretor precisar saber disso.
export const ADMIN_EMAIL_DOMINIO = "fontana.local";

export function usuarioParaEmail(usuario: string) {
  return `${usuario.trim().toLowerCase()}@${ADMIN_EMAIL_DOMINIO}`;
}