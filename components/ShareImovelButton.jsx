"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Copy, Check, MessageCircle, Mail, X } from "lucide-react";

/**
 * Botão de compartilhamento de imóvel — Fontana Negócios Imobiliários.
 *
 * Feito para encaixar na página de detalhes do imóvel (/imoveis/[slug]),
 * usando os mesmos tokens de cor do site (navy / brass / ink) e a fonte
 * "font-display" já usada nos outros componentes.
 *
 * Uso, dentro da página /imoveis/[slug]/page.tsx:
 *
 *   <ShareImovelButton
 *     titulo={imovel.titulo}
 *     slug={imovel.slug}
 *     preco={imovel.preco}
 *   />
 *
 * `slug` monta a URL como `${origin}/imoveis/${slug}` automaticamente
 * (funciona tanto em produção quanto em preview/localhost).
 * Se preferir passar a URL final você mesmo, use a prop `url` no lugar de `slug`.
 */
export default function ShareImovelButton({
  titulo = "Villas Damha Impper",
  slug = "villas-damha-impper-ft0004",
  preco = 933000,
  url,
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const wrapperRef = useRef(null);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const propertyUrl = url || `${origin}/imoveis/${slug}`;

  const precoFormatado =
    typeof preco === "number"
      ? preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        })
      : preco;

  const shareText = `${titulo} — ${precoFormatado}`;

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(propertyUrl);
    } catch {
      const el = document.createElement("textarea");
      el.value = propertyUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title: titulo, text: shareText, url: propertyUrl });
      setOpen(false);
    } catch {
      // usuário cancelou o compartilhamento nativo — sem ação necessária
    }
  }

  function handleWhatsApp() {
    const msg = encodeURIComponent(`${shareText}\n${propertyUrl}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  function handleEmail() {
    const subject = encodeURIComponent(titulo);
    const body = encodeURIComponent(`${shareText}\n\n${propertyUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="font-display inline-flex items-center gap-2 rounded-sm border border-ink/15 bg-transparent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      >
        <Share2 size={16} strokeWidth={2} className="text-brass" />
        Compartilhar
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-sm border border-ink/10 bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
            <span className="font-mono-data text-xs uppercase tracking-[0.15em] text-ink/50">
              Enviar ao cliente
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="text-ink/40 hover:text-ink"
            >
              <X size={14} />
            </button>
          </div>

          <MenuItem
            icon={copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            label={copied ? "Link copiado!" : "Copiar link"}
            onClick={handleCopy}
          />
          <MenuItem icon={<MessageCircle size={16} />} label="Enviar por WhatsApp" onClick={handleWhatsApp} />
          <MenuItem icon={<Mail size={16} />} label="Enviar por e-mail" onClick={handleEmail} />
          {canNativeShare && (
            <MenuItem icon={<Share2 size={16} />} label="Mais opções..." onClick={handleNativeShare} />
          )}

          <div className="border-t border-ink/10 bg-paper-dim/60 px-4 py-2">
            <p className="truncate font-mono-data text-[11px] text-ink/50" title={propertyUrl}>
              {propertyUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, onClick }) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-paper-dim"
    >
      <span className="text-brass">{icon}</span>
      {label}
    </button>
  );
}