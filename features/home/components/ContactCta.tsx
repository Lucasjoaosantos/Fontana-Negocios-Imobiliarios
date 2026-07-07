import { LinkButton } from "@/components/ui/Button";
import { linkWhatsapp } from "@/lib/utils";

export function ContactCta() {
  return (
    <section className="blueprint-grid bg-navy">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-semibold text-white">
            Procurando um imóvel específico?
          </h2>
          <p className="mt-2 max-w-lg text-white/70">
            Fale direto com o corretor Fontana pelo WhatsApp e receba
            indicações para o que você procura.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={linkWhatsapp("Olá! Gostaria de falar sobre um imóvel.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 font-display text-sm font-medium text-white transition-colors hover:brightness-95"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
