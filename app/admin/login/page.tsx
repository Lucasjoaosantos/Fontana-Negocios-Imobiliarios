"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { usuarioParaEmail } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: usuarioParaEmail(usuario),
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setErro("Usuário ou senha incorretos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-sm bg-navy p-8 shadow-xl">
        <div className="mb-8 flex justify-center">
          <Image
            src="/brand/logo-fontana-transparent.png"
            alt="Fontana Negócios Imobiliários"
            width={200}
            height={200}
            className="h-20 w-auto"
            priority
          />
        </div>

        <h1 className="font-display mb-6 text-center text-lg font-semibold text-white">
          Área do corretor
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/80">
              Usuário
            </label>
            <input
              type="text"
              required
              autoCapitalize="none"
              autoCorrect="off"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full rounded-sm border border-white/20 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
              placeholder="admin"
            />
          </div>

          <div>
<label className="mb-1.5 block text-xs font-medium text-white/80">
  Senha
</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-sm border border-white/20 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brass"
              placeholder="••••••••"
            />
          </div>

          {erro && <p className="text-sm text-danger">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 rounded-sm bg-white px-4 py-3 font-display text-sm font-medium text-navy transition-colors hover:bg-gray-100 disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}