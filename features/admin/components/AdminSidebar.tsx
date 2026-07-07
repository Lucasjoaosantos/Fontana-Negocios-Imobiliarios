"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Plus,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { BotaoSair } from "./BotaoSair";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/imoveis", label: "Imóveis", icon: Building2 },
  { href: "/admin/imoveis/novo", label: "Novo imóvel", icon: Plus },
];

export function AdminSidebar({ nomeUsuario }: { nomeUsuario: string }) {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between bg-navy px-4 py-3 text-white lg:hidden">
        <Image
          src="/brand/logo-fontana-transparent.png"
          alt="Fontana"
          width={140}
          height={140}
          className="h-9 w-auto"
        />
        <button
          type="button"
          onClick={() => setAberto(true)}
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-sm text-white/85 hover:bg-white/10"
        >
          <Menu size={22} />
        </button>
      </header>

      {aberto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setAberto(false)}
            className="absolute inset-0 bg-black/50"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-navy text-white shadow-xl">
            <div className="flex items-center justify-between p-5">
              <Image
                src="/brand/logo-fontana-transparent.png"
                alt="Fontana"
                width={160}
                height={160}
                className="h-12 w-auto"
              />
              <button
                type="button"
                onClick={() => setAberto(false)}
                aria-label="Fechar menu"
                className="flex h-9 w-9 items-center justify-center rounded-sm text-white/85 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setAberto(false)} />
            <div className="border-t border-white/10 p-3">
              <p className="px-3 pb-2 text-xs text-white/50">{nomeUsuario}</p>
              <BotaoSair />
            </div>
          </aside>
        </div>
      )}

      <aside className="hidden w-64 shrink-0 flex-col bg-navy text-white lg:flex">
        <div className="p-5">
          <Image
            src="/brand/logo-fontana-transparent.png"
            alt="Fontana"
            width={180}
            height={180}
            className="h-14 w-auto"
          />
        </div>
        <NavLinks pathname={pathname} />
        <div className="border-t border-white/10 p-3">
          <p className="px-3 pb-2 text-xs text-white/50">{nomeUsuario}</p>
          <BotaoSair />
        </div>
      </aside>
    </>
  );
}

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {LINKS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={`flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-white/85 hover:bg-white/5 ${
            pathname === href ? "bg-white/10 text-white" : ""
          }`}
        >
          <Icon size={17} />
          {label}
        </Link>
      ))}
      <Link
        href="/"
        target="_blank"
        onClick={onNavigate}
        className="flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
      >
        <ExternalLink size={17} />
        Ver site
      </Link>
    </nav>
  );
}