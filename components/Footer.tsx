import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Share2, Link2 } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="relative h-12 w-44 mb-4 brightness-0 invert">
              <Image
                src="/logo.jpg"
                alt="Giulius Biaso Imóveis"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mt-3">
              Realizando sonhos e concretizando negócios imobiliários com ética,
              transparência e excelência há mais de 10 anos.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors"
              >
                <Link2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Início", href: "/" },
                { label: "Imóveis para Venda", href: "/imoveis?tipo=venda" },
                { label: "Imóveis para Locação", href: "/imoveis?tipo=locacao" },
                { label: "Sobre Nós", href: "/#sobre" },
                { label: "Contato", href: "/#contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Serviços
            </h4>
            <ul className="space-y-2.5">
              {[
                "Compra e Venda",
                "Locação Residencial",
                "Locação Comercial",
                "Avaliação de Imóveis",
                "Consultoria Imobiliária",
                "Gestão de Imóveis",
              ].map((item) => (
                <li key={item} className="text-sm text-gray-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  (11) 9 9999-9999
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@giuliusbiaso.com.br"
                  className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  contato@giuliusbiaso.com.br
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Av. Paulista, 1000, conj. 101
                  <br />
                  São Paulo – SP, 01310-100
                </span>
              </li>
            </ul>

            <div className="mt-5 p-3 bg-gray-800 rounded-lg text-xs text-gray-400">
              <p className="font-medium text-gray-300 mb-1">Horário de atendimento</p>
              <p>Seg – Sex: 9h às 18h</p>
              <p>Sáb: 9h às 13h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Giulius Biaso Imóveis. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500">CRECI-SP 000000-J</p>
        </div>
      </div>
    </footer>
  );
}
