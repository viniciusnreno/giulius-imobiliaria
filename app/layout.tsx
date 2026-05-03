import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Giulius Biaso Imóveis | Compra, Venda e Locação",
    template: "%s | Giulius Biaso Imóveis",
  },
  description:
    "Encontre o imóvel dos seus sonhos com a Giulius Biaso Imóveis. Especialistas em compra, venda e locação de imóveis residenciais e comerciais.",
  keywords: [
    "imóveis",
    "compra",
    "venda",
    "locação",
    "apartamento",
    "casa",
    "Giulius Biaso",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Giulius Biaso Imóveis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
