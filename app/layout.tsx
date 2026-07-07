import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fontana Negócios Imobiliários",
    template: "%s Fontana Negócios Imobiliários",
  },
  description:
    "Imóveis para negócios com facilidade. Apartamentos, casas, terrenos e mais.",
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
