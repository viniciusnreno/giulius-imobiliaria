import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Home,
  Building2,
  MapPin,
  Shield,
  Award,
  Users,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Key,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { getImoveisDestaque } from "@/lib/imoveis";

const WHATSAPP_NUMBER = "5511999999999";

export default function HomePage() {
  const imoveisDestaque = getImoveisDestaque();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85"
            alt="Imóvel de alto padrão"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>Especialistas em imóveis de alto padrão</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Encontre o imóvel{" "}
              <span className="text-primary">dos seus sonhos</span>
            </h1>

            <p className="text-lg text-white/85 mb-10 leading-relaxed max-w-xl">
              Somos especialistas em compra, venda e locação de imóveis. Conte
              com nossa equipe para encontrar a melhor oportunidade para você.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="flex items-center gap-3 flex-1 px-3">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <span className="text-gray-400 text-sm">Buscar imóveis...</span>
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  <Link href="/imoveis?tipo=venda">Comprar</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 sm:flex-none">
                  <Link href="/imoveis?tipo=locacao">Alugar</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { value: "500+", label: "Imóveis negociados" },
                { value: "10+", label: "Anos de experiência" },
                { value: "98%", label: "Clientes satisfeitos" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── TIPOS DE IMÓVEIS ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              O que você está buscando?
            </h2>
            <p className="text-gray-500">
              Encontre imóveis para compra ou aluguel nas melhores regiões
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Home, label: "Casas", href: "/imoveis?categoria=casa" },
              {
                icon: Building2,
                label: "Apartamentos",
                href: "/imoveis?categoria=apartamento",
              },
              {
                icon: Home,
                label: "Sobrados",
                href: "/imoveis?categoria=sobrado",
              },
              {
                icon: Building2,
                label: "Studios",
                href: "/imoveis?categoria=studio",
              },
              {
                icon: MapPin,
                label: "Terrenos",
                href: "/imoveis?categoria=terreno",
              },
              {
                icon: Building2,
                label: "Comercial",
                href: "/imoveis?categoria=comercial",
              },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary transition-colors duration-200">
                  <cat.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-200" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMÓVEIS EM DESTAQUE ── */}
      {imoveisDestaque.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
                  Selecionados para você
                </p>
                <h2 className="text-3xl font-bold text-gray-900">
                  Imóveis em Destaque
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                className="shrink-0 hidden sm:flex"
              >
                <Link href="/imoveis" className="flex items-center gap-1">
                  Ver todos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imoveisDestaque.slice(0, 6).map((imovel) => (
                <PropertyCard key={imovel.id} imovel={imovel} />
              ))}
            </div>

            <div className="flex justify-center mt-8 sm:hidden">
              <Button asChild variant="outline">
                <Link href="/imoveis">Ver todos os imóveis</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── POR QUE NOS ESCOLHER ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
              Diferenciais
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Por que escolher a Giulius Biaso?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Trabalhamos com ética, transparência e compromisso para entregar
              os melhores resultados para nossos clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Segurança Jurídica",
                desc: "Toda documentação verificada e processo seguro do início ao fim.",
              },
              {
                icon: Award,
                title: "Experiência",
                desc: "Mais de 10 anos no mercado com centenas de negócios concluídos.",
              },
              {
                icon: Users,
                title: "Atendimento Personalizado",
                desc: "Equipe dedicada a entender suas necessidades e encontrar a solução ideal.",
              },
              {
                icon: TrendingUp,
                title: "Melhores Negócios",
                desc: "Avaliação justa e condições de negociação que beneficiam você.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[420px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=85"
                  alt="Sobre a Giulius Biaso Imóveis"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-xl shadow-xl p-5 border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">500+</p>
                    <p className="text-xs text-gray-500">Chaves entregues</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Nossa história
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                Mais de uma década realizando sonhos imobiliários
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A Giulius Biaso Imóveis nasceu da paixão pelo mercado
                imobiliário e do compromisso em oferecer um atendimento
                diferenciado. Com uma equipe experiente e dedicada, já ajudamos
                centenas de famílias e empresas a encontrar o imóvel ideal.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Atuamos na compra, venda e locação de imóveis residenciais e
                comerciais, sempre priorizando a transparência, a segurança
                jurídica e a satisfação total dos nossos clientes.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "500+", label: "Imóveis negociados" },
                  { value: "10+", label: "Anos no mercado" },
                  { value: "98%", label: "Satisfação" },
                  { value: "50+", label: "Regiões atendidas" },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-primary">
                      {item.value}
                    </p>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>

              <Button asChild size="lg">
                <Link href="/#contato">Fale conosco</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Quer anunciar seu imóvel?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Alcance milhares de compradores e locatários. Nossa equipe cuidará
            de tudo para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 font-semibold"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de anunciar meu imóvel com vocês.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Anunciar agora
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/imoveis">Ver imóveis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Entre em contato
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Estamos prontos para te ajudar
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Nossa equipe está disponível para tirar todas as suas dúvidas,
                agendar visitas e apresentar as melhores opções de imóveis para
                você.
              </p>

              <div className="space-y-5">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="p-3 bg-[#25D366]/10 rounded-full group-hover:bg-[#25D366]/20 transition-colors">
                    <Phone className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-500">(11) 9 9999-9999</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-primary transition-colors" />
                </a>

                <a
                  href="mailto:contato@giuliusbiaso.com.br"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">E-mail</p>
                    <p className="text-sm text-gray-500">
                      contato@giuliusbiaso.com.br
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-primary transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Endereço</p>
                    <p className="text-sm text-gray-500">
                      Av. Paulista, 1000, conj. 101 – São Paulo/SP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder / Office image */}
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85"
                alt="Escritório Giulius Biaso Imóveis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-bold text-lg">Nosso escritório</p>
                  <p className="text-sm text-white/80">
                    Av. Paulista, 1000 – São Paulo/SP
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Seg–Sex: 9h–18h | Sáb: 9h–13h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
