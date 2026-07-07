"use client";

import { useState } from "react";
import { aplicarMarcaDaguaEmFotosAntigas } from "@/features/admin/actions/marcaDagua";

export function BotaoMarcaDagua() {
  const [rodando, setRodando] = useState(false);
  const [resultado, setResultado] = useState<{
    processadas: number;
    falhas: string[];
  } | null>(null);

  async function rodar() {
    setRodando(true);
    setResultado(null);
    try {
      const r = await aplicarMarcaDaguaEmFotosAntigas();
      setResultado(r);
    } catch (err) {
      setResultado({
        processadas: 0,
        falhas: [err instanceof Error ? err.message : "Erro desconhecido"],
      });
    } finally {
      setRodando(false);
    }
  }

  return (
    <div className="rounded-sm border border-ink/10 bg-white p-6">
      <h2 className="font-display mb-2 text-sm font-semibold uppercase tracking-wide text-ink/60">
        Marca d&apos;água em fotos antigas
      </h2>
      <p className="mb-4 text-sm text-ink/60">
        Aplica a marca d&apos;água nas fotos enviadas antes desse recurso
        existir. Pode clicar mais de uma vez sem duplicar — só processa o que
        ainda não tem marca.
      </p>
      <button
        type="button"
        onClick={rodar}
        disabled={rodando}
        className="rounded-sm bg-navy px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {rodando ? "Processando..." : "Aplicar marca d'água"}
      </button>
      {resultado && (
        <div className="mt-4 text-sm">
          <p className="text-ink">
            {resultado.processadas} foto(s) processada(s) com sucesso.
          </p>
          {resultado.falhas.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-danger">
              {resultado.falhas.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}