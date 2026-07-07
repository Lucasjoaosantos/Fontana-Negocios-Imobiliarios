"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { linkWhatsapp, TELEFONE_EXIBICAO } from "@/lib/utils";

const links = [
  { href: "/imoveis?operacao=venda", label: "Comprar" },
  { href: "/imoveis?operacao=lancamento", label: "Lançamentos (Na Planta)" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center px-4 py-2 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-fontana-transparent.png"
            alt="Fontana Negócios Imobiliários"
            width={220}
            height={220}
            className="h-16 w-auto sm:h-20"
            priority
          />
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium tracking-wide text-white/85 transition-colors hover:text-brass-light"
            >
              {link.label}
            </Link>
          ))}

          <a
            href={linkWhatsapp(
              "Olá! Vim pelo site da Fontana Negócios Imobiliários e gostaria de mais informações."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm font-medium tracking-wide text-white/85 transition-colors hover:text-brass-light"
          >
            Contato
          </a>
        </nav>

        {/* Ações Desktop */}
        <div className="hidden items-center justify-end gap-5 lg:flex">
          <a
            href={linkWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/85 underline decoration-brass-light/40 underline-offset-4 hover:text-brass-light"
          >
            <Phone size={15} className="text-brass-light" />
            <WhatsappIcon size={15} className="text-brass-light" />
            {TELEFONE_EXIBICAO}
          </a>

          <LinkButton href="/imoveis" variant="secondary" size="sm">
            Ver imóveis
          </LinkButton>
        </div>

        {/* Botão Mobile */}
        <button
          className="justify-self-end p-2 text-white lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {open && (
        <nav className="border-t border-white/10 bg-navy px-4 pb-6 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-3 font-display text-sm font-medium text-white/90 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}

            <a
              href={linkWhatsapp(
                "Olá! Vim pelo site da Fontana Negócios Imobiliários e gostaria de mais informações."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-3 font-display text-sm font-medium text-white/90 hover:bg-white/5"
            >
              Contato
            </a>

            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-2 text-sm text-white/85 underline decoration-brass-light/40 underline-offset-4"
            >
              <Phone size={15} className="text-brass-light" />
              <WhatsappIcon size={15} className="text-brass-light" />
              {TELEFONE_EXIBICAO}
            </a>

            <LinkButton
              href="/imoveis"
              variant="secondary"
              size="md"
              className="mt-3 justify-center"
            >
              Ver imóveis
            </LinkButton>
          </div>
        </nav>
      )}
    </header>
  );
}
