import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Car, Maximize2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Imovel } from "@/lib/imoveis";
import { formatCurrency, formatArea } from "@/lib/utils";

interface PropertyCardProps {
  imovel: Imovel;
  variant?: "default" | "horizontal";
}

export default function PropertyCard({
  imovel,
  variant = "default",
}: PropertyCardProps) {
  const WHATSAPP_NUMBER = "5511999999999";
  const waText = encodeURIComponent(
    `Olá! Tenho interesse no imóvel: ${imovel.titulo} (ID: ${imovel.id}). Poderia me passar mais informações?`,
  );

  if (variant === "horizontal") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row">
        <div className="relative sm:w-72 h-52 sm:h-auto shrink-0">
          <Image
            src={
              imovel.imagens[0] ||
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
            }
            alt={imovel.titulo}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={imovel.tipo === "venda" ? "venda" : "locacao"}>
              {imovel.tipo === "venda" ? "Venda" : "Locação"}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col p-5 flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-900 text-lg leading-snug">
              {imovel.titulo}
            </h3>
            <Badge variant="secondary" className="shrink-0 capitalize">
              {imovel.categoria}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>
              {imovel.bairro}, {imovel.cidade}/{imovel.estado}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {imovel.descricao}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {imovel.area > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Maximize2 className="h-4 w-4 text-gray-400 shrink-0" />
                <span>{formatArea(imovel.area)}</span>
              </div>
            )}
            {imovel.quartos > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Bed className="h-4 w-4 text-gray-400 shrink-0" />
                <span>
                  {imovel.quartos} {imovel.quartos === 1 ? "quarto" : "quartos"}
                </span>
              </div>
            )}
            {imovel.banheiros > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Bath className="h-4 w-4 text-gray-400 shrink-0" />
                <span>
                  {imovel.banheiros}{" "}
                  {imovel.banheiros === 1 ? "banheiro" : "banheiros"}
                </span>
              </div>
            )}
            {imovel.vagas > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Car className="h-4 w-4 text-gray-400 shrink-0" />
                <span>
                  {imovel.vagas} {imovel.vagas === 1 ? "vaga" : "vagas"}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {imovel.tipo === "locacao" ? "Aluguel/mês" : "Valor"}
              </p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(imovel.preco)}
                {imovel.tipo === "locacao" && (
                  <span className="text-sm font-normal text-gray-500">
                    /mês
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/imoveis/${imovel.id}`}>Ver detalhes</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-[#25D366] hover:bg-[#20BD5C]"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={
            imovel.imagens[0] ||
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
          }
          alt={imovel.titulo}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={imovel.tipo === "venda" ? "venda" : "locacao"}>
            {imovel.tipo === "venda" ? "Venda" : "Locação"}
          </Badge>
          {imovel.destaque && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              Destaque
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="mb-1">
          <Badge variant="secondary" className="text-xs capitalize mb-2">
            {imovel.categoria}
          </Badge>
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
            {imovel.titulo}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 mb-3">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {imovel.bairro}, {imovel.cidade}/{imovel.estado}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {imovel.area > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Maximize2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span>{formatArea(imovel.area)}</span>
            </div>
          )}
          {imovel.quartos > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Bed className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span>
                {imovel.quartos} {imovel.quartos === 1 ? "quarto" : "quartos"}
              </span>
            </div>
          )}
          {imovel.banheiros > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Bath className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span>
                {imovel.banheiros}{" "}
                {imovel.banheiros === 1 ? "banheiro" : "banheiros"}
              </span>
            </div>
          )}
          {imovel.vagas > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Car className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span>
                {imovel.vagas} {imovel.vagas === 1 ? "vaga" : "vagas"}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
            {imovel.tipo === "locacao" ? "Aluguel/mês" : "Valor"}
          </p>
          <p className="text-xl font-bold text-primary mb-3">
            {formatCurrency(imovel.preco)}
            {imovel.tipo === "locacao" && (
              <span className="text-sm font-normal text-gray-500">/mês</span>
            )}
          </p>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/imoveis/${imovel.id}`}>Detalhes</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-[#25D366] hover:bg-[#20BD5C] flex-1"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
