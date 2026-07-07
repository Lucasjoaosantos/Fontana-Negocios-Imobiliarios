"use client";

const CAMINHO_LOGO = "/brand/logo-fontana-transparent.png";

function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function aplicarMarcaDagua(file: File): Promise<Blob> {
  const fotoUrl = URL.createObjectURL(file);
  const [foto, logo] = await Promise.all([
    carregarImagem(fotoUrl),
    carregarImagem(CAMINHO_LOGO),
  ]);
  URL.revokeObjectURL(fotoUrl);

  const canvas = document.createElement("canvas");
  canvas.width = foto.naturalWidth;
  canvas.height = foto.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Não foi possível processar a imagem.");

  // Desenha a foto original
  ctx.drawImage(foto, 0, 0, canvas.width, canvas.height);

  // Marca d'água ocupa 45% da largura da foto, centralizada, proporção mantida
  const larguraMarca = canvas.width * 0.45;
  const alturaMarca = larguraMarca * (logo.naturalHeight / logo.naturalWidth);
  const x = (canvas.width - larguraMarca) / 2;
  const y = (canvas.height - alturaMarca) / 2;

  // Renderiza a logo em branco e semitransparente por cima da foto
  ctx.save();
  ctx.globalAlpha = 0.32;
  ctx.filter = "grayscale(1) brightness(0) invert(1)";
  ctx.drawImage(logo, x, y, larguraMarca, alturaMarca);
  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Falha ao gerar imagem com marca d'água.")),
      file.type === "image/png" ? "image/png" : "image/jpeg",
      0.9
    );
  });
}