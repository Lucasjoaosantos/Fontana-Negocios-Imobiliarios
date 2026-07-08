"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import { Star, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { definirCapa, excluirImagem } from "@/app/admin/imoveis/actions";
import { aplicarMarcaDagua } from "@/features/admin/lib/watermark";

interface Imagem {
  id: string;
  url: string;
  path: string;
  capa: boolean;
}

export function PhotoManager({
  imovelId,
  imagens,
}: {
  imovelId: string;
  imagens: Imagem[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErro(null);
    setEnviando(true);
    const supabase = createClient();

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop();
        const path = `${imovelId}/${Date.now()}-${i}.${ext}`;

  const arquivoComMarca = await aplicarMarcaDagua(file);

        
const { error: uploadError } = await supabase.storage
  .from("imoveis")
  .upload(path, arquivoComMarca, { upsert: false });
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("imoveis").getPublicUrl(path);

        const { error: insertError } = await supabase.from("imagens").insert({
          imovel_id: imovelId,
          url: publicUrl,
          path,
          ordem: imagens.length + i,
          capa: imagens.length === 0 && i === 0,
        });
        if (insertError) throw insertError;
      }
      router.refresh();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao enviar foto.");
    } finally {
      setEnviando(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-ink/20 bg-paper-dim/50 px-4 py-10 text-center transition-colors hover:border-brass"
      >
        <Upload size={22} className="text-brass" />
        <p className="text-sm text-ink/70">
          {enviando ? "Enviando fotos..." : "Clique ou arraste as fotos aqui"}
        </p>
        <p className="text-xs text-ink/40">JPG, PNG ou WEBP — várias de uma vez</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {erro && <p className="mt-3 text-sm text-danger">{erro}</p>}

      {imagens.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {imagens.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-sm border border-ink/10">
              <Image src={img.url} alt="" fill className="object-cover" sizes="200px" />
              {img.capa && (
                <span className="absolute left-2 top-2 rounded-sm bg-brass px-2 py-0.5 text-[10px] font-medium text-white">
                  Capa
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/0 opacity-0 transition-all group-hover:bg-ink/50 group-hover:opacity-100">
                {!img.capa && (
                  <button
                    type="button"
                    title="Definir como capa"
                    onClick={() => definirCapa(imovelId, img.id).then(() => router.refresh())}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink hover:bg-brass hover:text-white"
                  >
                    <Star size={16} />
                  </button>
                )}
                <button
                  type="button"
                  title="Excluir foto"
                  onClick={() =>
                    excluirImagem(imovelId, img.id, img.path).then(() => router.refresh())
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-danger hover:bg-danger hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
