"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Imóveis", href: "/imoveis" },
  { label: "Venda", href: "/imoveis?tipo=venda" },
  { label: "Locação", href: "/imoveis?tipo=locacao" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

const WHATSAPP_NUMBER = "5511999999999";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-12 w-40">
              <Image
                src="/logo.jpg"
                alt="Giulius Biaso Imóveis"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">(11) 9 9999-9999</span>
            </a>
            <Button
              asChild
              size="sm"
              className="bg-[#25D366] hover:bg-[#20BD5C] text-white"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vim pelo site e gostaria de mais informações sobre imóveis.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 mt-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vim pelo site e gostaria de mais informações sobre imóveis.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white rounded-md font-semibold text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
