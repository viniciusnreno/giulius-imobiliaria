import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  ChevronRight,
  Phone,
  MessageCircle,
  Share2,
  CalendarDays,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { getImovelById, getAllImoveis } from "@/lib/imoveis";
import { formatCurrency, formatArea } from "@/lib/utils";
import CopyLinkButton from "@/components/CopyLinkButton";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const imovel = getImovelById(id);
  if (!imovel) return { title: "Imóvel não encontrado" };
  return {
    title: imovel.titulo,
    description: imovel.descricao.slice(0, 160),
  };
}

const WHATSAPP_NUMBER = "5511999999999";

export default async function ImovelPage({ params }: PageProps) {
  const { id } = await params;
  const imovel = getImovelById(id);

  if (!imovel) notFound();

  const waText = encodeURIComponent(
    `Olá! Tenho interesse no imóvel: ${imovel.titulo} (ID: ${imovel.id}). Poderia me passar mais informações?`
  );

  const relacionados = getAllImoveis()
    .filter((i) => i.id !== imovel.id && i.tipo === imovel.tipo)
    .slice(0, 3);

  const features = [
    ...(imovel.quartos > 0
      ? [{ icon: Bed, label: `${imovel.quartos} ${imovel.quartos === 1 ? "Quarto" : "Quartos"}` }]
      : []),
    ...(imovel.banheiros > 0
      ? [{ icon: Bath, label: `${imovel.banheiros} ${imovel.banheiros === 1 ? "Banheiro" : "Banheiros"}` }]
      : []),
    ...(imovel.vagas > 0
      ? [{ icon: Car, label: `${imovel.vagas} ${imovel.vagas === 1 ? "Vaga" : "Vagas"}` }]
      : []),
    ...(imovel.area > 0 ? [{ icon: Maximize2, label: formatArea(imovel.area) }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/imoveis" className="hover:text-primary transition-colors">
              Imóveis
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {imovel.titulo}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {imovel.imagens.length > 0 ? (
                <div className="grid grid-cols-1 gap-1">
                  <div className="relative h-[320px] md:h-[440px]">
                    <Image
                      src={imovel.imagens[0]}
                      alt={imovel.titulo}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant={imovel.tipo === "venda" ? "venda" : "locacao"}>
                        {imovel.tipo === "venda" ? "Venda" : "Locação"}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {imovel.categoria}
                      </Badge>
                    </div>
                  </div>
                  {imovel.imagens.length > 1 && (
                    <div className="grid grid-cols-3 gap-1">
                      {imovel.imagens.slice(1, 4).map((img, idx) => (
                        <div key={idx} className="relative h-28 md:h-36">
                          <Image
                            src={img}
                            alt={`${imovel.titulo} - foto ${idx + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-72 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagens</span>
                </div>
              )}
            </div>

            {/* Title & Price */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {imovel.titulo}
                  </h1>
                  <div className="flex items-center gap-1.5 text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="text-sm">
                      {imovel.endereco} — {imovel.bairro}, {imovel.cidade}/{imovel.estado}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Olha esse imóvel: ${imovel.titulo} - `)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors shrink-0"
                  title="Compartilhar"
                >
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </a>
              </div>

              <div className="flex flex-wrap gap-4 py-4 border-y border-gray-100">
                {features.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-gray-700">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  {imovel.tipo === "locacao" ? "Aluguel mensal" : "Valor de venda"}
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(imovel.preco)}
                  {imovel.tipo === "locacao" && (
                    <span className="text-base font-normal text-gray-500">/mês</span>
                  )}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Descrição</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {imovel.descricao}
              </p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Detalhes do imóvel</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Tipo", value: imovel.tipo === "venda" ? "Venda" : "Locação" },
                  { label: "Categoria", value: imovel.categoria.charAt(0).toUpperCase() + imovel.categoria.slice(1) },
                  ...(imovel.area > 0 ? [{ label: "Área total", value: formatArea(imovel.area) }] : []),
                  ...(imovel.quartos > 0 ? [{ label: "Quartos", value: String(imovel.quartos) }] : []),
                  ...(imovel.banheiros > 0 ? [{ label: "Banheiros", value: String(imovel.banheiros) }] : []),
                  ...(imovel.vagas > 0 ? [{ label: "Vagas", value: String(imovel.vagas) }] : []),
                  { label: "Cidade", value: `${imovel.cidade}/${imovel.estado}` },
                  { label: "Bairro", value: imovel.bairro },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>
                  Publicado em{" "}
                  {new Date(imovel.criadoEm).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                Tenho interesse
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                Entre em contato e agende uma visita
              </p>

              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Falar no WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <a href={`tel:+${WHATSAPP_NUMBER}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar agora
                  </a>
                </Button>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">GB</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Giulius Biaso Imóveis
                    </p>
                    <p className="text-xs text-gray-500">CRECI-SP 000000-J</p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-500 mb-1">Horário de atendimento</p>
                  <p>Seg–Sex: 9h às 18h | Sáb: 9h às 13h</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Compartilhar este imóvel
              </p>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Olha esse imóvel: ${imovel.titulo} - `)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-medium bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366]/20 transition-colors"
                >
                  WhatsApp
                </a>
                <CopyLinkButton />
              </div>
            </div>
          </aside>
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Imóveis relacionados
              </h2>
              <Link
                href={`/imoveis?tipo=${imovel.tipo}`}
                className="text-sm text-primary hover:underline"
              >
                Ver mais
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relacionados.map((rel) => (
                <PropertyCard key={rel.id} imovel={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
