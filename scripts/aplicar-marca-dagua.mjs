import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "imoveis";
const LOGO_PATH = path.resolve("public/brand/logo-fontana-transparent.png");
const LARGURA_RELATIVA = 0.45; // 45% da largura da foto
const OPACIDADE = 0.32; // 32%

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local antes de rodar."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function criarLogoBranca(larguraAlvo) {
  const logo = sharp(LOGO_PATH).resize({ width: Math.round(larguraAlvo) });
  const { data, info } = await logo
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

async function aplicarMarca(bufferOriginal) {
  const imagem = sharp(bufferOriginal);
  const metadata = await imagem.metadata();
  const larguraAlvo = metadata.width * LARGURA_RELATIVA;

  const marcaBuffer = await criarLogoBranca(larguraAlvo);
  const marcaMeta = await sharp(marcaBuffer).metadata();

  const left = Math.round((metadata.width - marcaMeta.width) / 2);
  const top = Math.round((metadata.height - marcaMeta.height) / 2);

  return imagem
    .composite([{ input: marcaBuffer, left, top }])
    .toBuffer();
}

async function main() {
  const { data: imagens, error } = await supabase
    .from("imagens")
    .select("id, path")
    .eq("marca_dagua", false);

  if (error) {
    console.error("Erro ao listar imagens:", error.message);
    process.exit(1);
  }

  console.log(`${imagens.length} foto(s) para processar.`);

  for (const img of imagens) {
    process.stdout.write(`Processando ${img.path}... `);

    try {
      const { data: arquivo, error: downloadError } = await supabase.storage
        .from(BUCKET)
        .download(img.path);
      if (downloadError) throw downloadError;

      const bufferOriginal = Buffer.from(await arquivo.arrayBuffer());
      const bufferComMarca = await aplicarMarca(bufferOriginal);

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(img.path, bufferComMarca, { upsert: true });
      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("imagens")
        .update({ marca_dagua: true })
        .eq("id", img.id);
      if (updateError) throw updateError;

      console.log("ok");
    } catch (err) {
      console.log("FALHOU");
      console.error(`  -> ${img.path}:`, err.message ?? err);
    }
  }

  console.log("Concluído.");
}

main();