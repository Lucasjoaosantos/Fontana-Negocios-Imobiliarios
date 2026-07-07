"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { excluirImovel } from "@/app/admin/imoveis/actions";

export function BotaoExcluirImovel({ id, titulo }: { id: string; titulo: string }) {
  const [confirmando, setConfirmando] = useState(false);
  const [pending, startTransition] = useTransition();

  if (confirmando) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => startTransition(() => excluirImovel(id))}
          disabled={pending}
          className="rounded-sm bg-danger px-2 py-1 text-xs font-medium text-white"
        >
          {pending ? "..." : "Confirmar"}
        </button>
        <button
          onClick={() => setConfirmando(false)}
          className="rounded-sm px-2 py-1 text-xs text-ink/50 hover:bg-paper-dim"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      title={`Excluir "${titulo}"`}
      onClick={() => setConfirmando(true)}
      className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/50 hover:bg-danger/10 hover:text-danger"
    >
      <Trash2 size={15} />
    </button>
  );
}
