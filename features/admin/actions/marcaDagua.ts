"use server";

import sharp from "sharp";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

const BUCKET = "imoveis";
const LARGURA_RELATIVA = 0.45;
const OPACIDADE = 0.32;
const LOGO_URL =
  "https://fontana-negocios-imobiliarios.vercel.app/brand/logo-fontana-transparent.png";

async function criarLogoBranca(larguraAlvo: number) {
  const resp = await fetch(LOGO_URL);
  const logoBuffer = Buffer.from(await resp.arrayBuffer());

  const { data, info } = await sharp(logoBuffer)
    .resize({ width: Math.round(larguraAlvo) })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = Math.round(data[i + 3] * OPACIDADE);
  }

  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

export async function aplicarMarcaDaguaEmFotosAntigas() {
  const supabase = createAdminClient();

  const { data: imagens, error } = await supabase
    .from("imagens")
    .select("id, path")
    .eq("marca_dagua", false);

  if (error) throw new Error(`Erro ao listar imagens: ${error.message}`);

  const resultado = { processadas: 0, falhas: [] as string[] };

  for (const img of imagens ?? []) {
    try {
      const { data: arquivo, error: downloadError } = await supabase.storage
        .from(BUCKET)
        .download(img.path);
      if (downloadError) throw downloadError;

      const bufferOriginal = Buffer.from(await arquivo.arrayBuffer());
      const imagemSharp = sharp(bufferOriginal);
      const metadata = await imagemSharp.metadata();
      const larguraAlvo = (metadata.width ?? 1000) * LARGURA_RELATIVA;

      const marcaBuffer = await criarLogoBranca(larguraAlvo);
      const marcaMeta = await sharp(marcaBuffer).metadata();

      const left = Math.round(
        ((metadata.width ?? 0) - (marcaMeta.width ?? 0)) / 2
      );
      const top = Math.round(
        ((metadata.height ?? 0) - (marcaMeta.height ?? 0)) / 2
      );

      const bufferComMarca = await imagemSharp
        .composite([{ input: marcaBuffer, left, top }])
        .toBuffer();

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(img.path, bufferComMarca, { upsert: true });
      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("imagens")
        .update({ marca_dagua: true })
        .eq("id", img.id);
      if (updateError) throw updateError;

      resultado.processadas++;
    } catch (err) {
      resultado.falhas.push(
        `${img.path}: ${err instanceof Error ? err.message : "erro desconhecido"}`
      );
    }
  }

  revalidatePath("/admin/imoveis");
  return resultado;
}
