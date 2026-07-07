"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const operacoes = [
  { value: "venda", label: "Comprar" },
  { value: "lancamento", label: "Lançamentos (Na Planta)" },
] as const;

export function SearchBar() {
  const router = useRouter();
  const [operacao, setOperacao] = useState<(typeof operacoes)[number]["value"]>("venda");
  const [busca, setBusca] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ operacao });
    if (busca.trim()) params.set("busca", busca.trim());
    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-2xl rounded-sm border border-brass-light/40 bg-white shadow-xl">
      <div className="flex border-b border-ink/10">
        {operacoes.map((op) => (
          <button
            key={op.value}
            type="button"
            onClick={() => setOperacao(op.value)}
            className={cn(
              "font-display flex-1 px-4 py-3 text-sm font-medium tracking-wide transition-colors",
              operacao === op.value
                ? "border-b-2 border-brass text-navy"
                : "text-ink/50 hover:text-ink"
            )}
          >
            {op.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3">
        <Search size={20} className="ml-2 shrink-0 text-ink/40" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          type="text"
          placeholder="Digite a Cidade, bairro, condomínio ou código do imóvel"
          className="w-full bg-transparent px-1 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-sm bg-navy px-5 py-3 font-display text-sm font-medium text-white transition-colors hover:bg-ink"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
