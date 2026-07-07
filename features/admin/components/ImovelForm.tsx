"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import type { ImovelFormData } from "@/app/admin/imoveis/actions";

interface Props {
  tipos: { id: string; nome: string }[];
  caracteristicasDisponiveis: { id: string; nome: string }[];
  valoresIniciais?: Partial<ImovelFormData>;
  aoSalvar: (dados: ImovelFormData) => Promise<void>;
  textoBotao?: string;
}

const campoClasse =
  "w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brass";
const labelClasse = "mb-1.5 block text-xs font-medium text-ink/70";

export function ImovelForm({
  tipos,
  caracteristicasDisponiveis,
  valoresIniciais,
  aoSalvar,
  textoBotao = "Salvar imóvel",
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [erro, setErro] = useState<string | null>(null);

  const [dados, setDados] = useState<ImovelFormData>({
    titulo: valoresIniciais?.titulo ?? "",
    descricao: valoresIniciais?.descricao ?? "",
    tipoId: valoresIniciais?.tipoId ?? tipos[0]?.id ?? "",
    operacao: valoresIniciais?.operacao ?? "venda",
    status: valoresIniciais?.status ?? "disponivel",
    preco: valoresIniciais?.preco ?? "",
    valorCondominio: valoresIniciais?.valorCondominio ?? "",
    valorIptu: valoresIniciais?.valorIptu ?? "",
    areaTotal: valoresIniciais?.areaTotal ?? "",
    areaConstruida: valoresIniciais?.areaConstruida ?? "",
    quartos: valoresIniciais?.quartos ?? "0",
    suites: valoresIniciais?.suites ?? "0",
    banheiros: valoresIniciais?.banheiros ?? "0",
    vagas: valoresIniciais?.vagas ?? "0",
    cidade: valoresIniciais?.cidade ?? "",
    uf: valoresIniciais?.uf ?? "SC",
    bairro: valoresIniciais?.bairro ?? "",
    condominio: valoresIniciais?.condominio ?? "",
    endereco: valoresIniciais?.endereco ?? "",
    destaque: valoresIniciais?.destaque ?? false,
    caracteristicas: valoresIniciais?.caracteristicas ?? [],
  });

  function set<K extends keyof ImovelFormData>(campo: K, valor: ImovelFormData[K]) {
    setDados((d) => ({ ...d, [campo]: valor }));
  }

  function alternarCaracteristica(id: string) {
    setDados((d) => ({
      ...d,
      caracteristicas: d.caracteristicas.includes(id)
        ? d.caracteristicas.filter((c) => c !== id)
        : [...d.caracteristicas, id],
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    startTransition(async () => {
      try {
        await aoSalvar(dados);
        router.push("/admin/imoveis?salvo=1");
      } catch (err) {
        const digest = (err as { digest?: string })?.digest;
        if (digest?.startsWith("NEXT_REDIRECT")) throw err;
        setErro(err instanceof Error ? err.message : "Erro ao salvar imóvel.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section>
        <h2 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Informações principais
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClasse}>Título do anúncio</label>
            <input
              required
              value={dados.titulo}
              onChange={(e) => set("titulo", e.target.value)}
              className={campoClasse}
              placeholder="Ex: Apartamento 3 quartos no Centro"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasse}>Descrição</label>
            <textarea
              rows={4}
              value={dados.descricao}
              onChange={(e) => set("descricao", e.target.value)}
              className={campoClasse}
              placeholder="Detalhes do imóvel, diferenciais, estado de conservação..."
            />
          </div>

          <div>
            <label className={labelClasse}>Tipo do imóvel</label>
            <select
              value={dados.tipoId}
              onChange={(e) => set("tipoId", e.target.value)}
              className={campoClasse}
            >
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasse}>Operação</label>
            <select
              value={dados.operacao}
              onChange={(e) => set("operacao", e.target.value as ImovelFormData["operacao"])}
              className={campoClasse}
            >
              <option value="venda">Venda</option>
              <option value="lancamento">Lançamento</option>
            </select>
            <p className="mt-1 text-xs text-ink/50">
              Lançamento = ainda na planta/em construção, não entregue.
            </p>
          </div>

          <div>
            <label className={labelClasse}>Status</label>
            <select
              value={dados.status}
              onChange={(e) => set("status", e.target.value as ImovelFormData["status"])}
              className={campoClasse}
            >
              <option value="disponivel">Disponível</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
              <option value="inativo">Inativo (oculto do site)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 pt-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="destaque"
                checked={dados.destaque}
                onChange={(e) => set("destaque", e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="destaque" className="text-sm text-ink">
                Mostrar em destaque na home
              </label>
            </div>
            <p className="text-xs text-ink/50">
              Use para preço de oportunidade, unidade rara (prédio/condomínio
              difícil de achar) ou boas condições comerciais.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Valores
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClasse}>Preço (R$)</label>
            <input
              value={dados.preco}
              onChange={(e) => set("preco", e.target.value)}
              className={campoClasse}
              placeholder="450000"
              inputMode="decimal"
            />
          </div>
          <div>
            <label className={labelClasse}>Condomínio (R$)</label>
            <input
              value={dados.valorCondominio}
              onChange={(e) => set("valorCondominio", e.target.value)}
              className={campoClasse}
              placeholder="380"
              inputMode="decimal"
            />
          </div>
          <div>
            <label className={labelClasse}>IPTU (R$)</label>
            <input
              value={dados.valorIptu}
              onChange={(e) => set("valorIptu", e.target.value)}
              className={campoClasse}
              placeholder="120"
              inputMode="decimal"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Características
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <label className={labelClasse}>Área total (m²)</label>
            <input
              value={dados.areaTotal}
              onChange={(e) => set("areaTotal", e.target.value)}
              className={campoClasse}
              inputMode="decimal"
            />
          </div>
          <div>
            <label className={labelClasse}>Área construída (m²)</label>
            <input
              value={dados.areaConstruida}
              onChange={(e) => set("areaConstruida", e.target.value)}
              className={campoClasse}
              inputMode="decimal"
            />
          </div>
          <div>
            <label className={labelClasse}>Quartos</label>
            <input
              value={dados.quartos}
              onChange={(e) => set("quartos", e.target.value)}
              className={campoClasse}
              inputMode="numeric"
            />
          </div>
          <div>
            <label className={labelClasse}>Suítes</label>
            <input
              value={dados.suites}
              onChange={(e) => set("suites", e.target.value)}
              className={campoClasse}
              inputMode="numeric"
            />
          </div>
          <div>
            <label className={labelClasse}>Banheiros</label>
            <input
              value={dados.banheiros}
              onChange={(e) => set("banheiros", e.target.value)}
              className={campoClasse}
              inputMode="numeric"
            />
          </div>
          <div>
            <label className={labelClasse}>Vagas</label>
            <input
              value={dados.vagas}
              onChange={(e) => set("vagas", e.target.value)}
              className={campoClasse}
              inputMode="numeric"
            />
          </div>
        </div>

        {caracteristicasDisponiveis.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {caracteristicasDisponiveis.map((c) => {
              const ativo = dados.caracteristicas.includes(c.id);
              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => alternarCaracteristica(c.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    ativo
                      ? "border-navy bg-navy text-white"
                      : "border-ink/15 bg-white text-ink/70 hover:border-ink/30"
                  }`}
                >
                  {c.nome}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Localização
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClasse}>Cidade</label>
            <input
              required
              value={dados.cidade}
              onChange={(e) => set("cidade", e.target.value)}
              className={campoClasse}
              placeholder="Chapecó"
            />
          </div>
          <div>
            <label className={labelClasse}>UF</label>
            <input
              required
              maxLength={2}
              value={dados.uf}
              onChange={(e) => set("uf", e.target.value.toUpperCase())}
              className={campoClasse}
              placeholder="SC"
            />
          </div>
          <div>
            <label className={labelClasse}>Bairro</label>
            <input
              required
              value={dados.bairro}
              onChange={(e) => set("bairro", e.target.value)}
              className={campoClasse}
              placeholder="Centro"
            />
          </div>
          <div>
            <label className={labelClasse}>Condomínio (opcional)</label>
            <input
              value={dados.condominio}
              onChange={(e) => set("condominio", e.target.value)}
              className={campoClasse}
              placeholder="Ed. Villa Real"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <label className={labelClasse}>Endereço (opcional)</label>
            <input
              value={dados.endereco}
              onChange={(e) => set("endereco", e.target.value)}
              className={campoClasse}
              placeholder="Rua, número, complemento"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-ink/50">
          Cidade, bairro e condomínio são criados automaticamente se ainda não
          existirem — não precisa cadastrar em outro lugar.
        </p>
      </section>

      {erro && (
        <p className="rounded-sm bg-danger/10 px-4 py-3 text-sm text-danger">{erro}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-sm bg-navy px-6 py-3.5 font-display text-sm font-medium text-white transition-colors hover:bg-ink disabled:opacity-50"
      >
        {pending ? "Salvando..." : textoBotao}
      </button>
    </form>
  );
}