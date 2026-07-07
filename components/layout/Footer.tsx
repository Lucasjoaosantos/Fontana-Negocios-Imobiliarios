import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { linkWhatsapp, TELEFONE_EXIBICAO, INSTAGRAM_URL } from "@/lib/utils";

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const colunas = [
  {
    titulo: "Imóveis",
    links: [
      { href: "/imoveis?operacao=venda", label: "Comprar" },
      { href: "/imoveis?operacao=lancamento", label: "Lançamentos (Na Planta)" },
    ],
  },
  {
    titulo: "Institucional",
    links: [
      {
        href: linkWhatsapp("Olá! Vim pelo site da Fontana e gostaria de mais informações."),
        label: "Fale conosco",
        externo: true,
      },
      { href: "/admin/login", label: "Área do corretor" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8 lg:items-start">
        <div>
          <Image
            src="/brand/logo-fontana-transparent.png"
            alt="Fontana Negócios Imobiliários"
            width={220}
            height={220}
            className="mb-4 h-16 w-auto"
          />
          <p className="max-w-xs text-sm text-white/70">
            Conectamos o futuro realizando sonhos. Venda de imóveis com
            atendimento próximo e transparente.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-brass"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {colunas.map((coluna) => (
          <div key={coluna.titulo}>
            <h3 className="font-display mb-4 text-sm font-semibold tracking-wide text-brass-light uppercase">
              {coluna.titulo}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {coluna.links.map((link) =>
                "externo" in link && link.externo ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display mb-4 text-sm font-semibold tracking-wide text-brass-light uppercase">
            Contato
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brass-light" />
              São Carlos, SP
            </li>
            <li>
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 underline decoration-brass-light/40 underline-offset-4 hover:text-white"
              >
                <Phone size={15} className="shrink-0 text-brass-light" />
                <WhatsappIcon size={15} className="shrink-0 text-brass-light" />
                {TELEFONE_EXIBICAO}
              </a>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-white/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Fontana Negócios Imobiliários. Todos os direitos reservados. - CRECI SP 274725-F
        </p>
      </div>
    </footer>
  );
}
