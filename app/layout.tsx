import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fontana-negocios-imobiliarios.vercel.app"),
  applicationName: "Fontana Negócios Imobiliários",
  title: {
    default: "Fontana Negócios Imobiliários",
    template: "%s | Fontana Negócios Imobiliários",
  },
  description:
    "Imóveis para negócios com facilidade. Apartamentos, casas, terrenos e mais.",
  openGraph: {
    siteName: "Fontana Negócios Imobiliários",
    title: "Fontana Negócios Imobiliários",
    description:
      "Imóveis para negócios com facilidade. Apartamentos, casas, terrenos e mais.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fontana Negócios Imobiliários",
    description:
      "Imóveis para negócios com facilidade. Apartamentos, casas, terrenos e mais.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
