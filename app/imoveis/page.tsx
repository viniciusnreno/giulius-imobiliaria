import { Suspense } from "react";
import { getAllImoveis, type TipoImovel, type CategoriaImovel } from "@/lib/imoveis";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imóveis",
  description: "Encontre imóveis para venda e locação. Casas, apartamentos, terrenos e mais.",
};

interface SearchParams {
  tipo?: string;
  categoria?: string;
  q?: string;
  ordem?: string;
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const allImoveis = getAllImoveis();

  let filtered = allImoveis;

  if (params.tipo && (params.tipo === "venda" || params.tipo === "locacao")) {
    filtered = filtered.filter((i) => i.tipo === (params.tipo as TipoImovel));
  }

  if (params.categoria && params.categoria !== "todos") {
    filtered = filtered.filter(
      (i) => i.categoria === (params.categoria as CategoriaImovel)
    );
  }

  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.titulo.toLowerCase().includes(q) ||
        i.bairro.toLowerCase().includes(q) ||
        i.cidade.toLowerCase().includes(q) ||
        i.descricao.toLowerCase().includes(q)
    );
  }

  // Ordenação
  const ordem = params.ordem ?? "recente";
  if (ordem === "menor-preco") {
    filtered = [...filtered].sort((a, b) => a.preco - b.preco);
  } else if (ordem === "maior-preco") {
    filtered = [...filtered].sort((a, b) => b.preco - a.preco);
  } else if (ordem === "maior-area") {
    filtered = [...filtered].sort((a, b) => b.area - a.area);
  } else {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );
  }

  const tipoLabel =
    params.tipo === "venda"
      ? "para Venda"
      : params.tipo === "locacao"
      ? "para Locação"
      : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Imóveis {tipoLabel}
          </h1>
          <p className="text-gray-500 mt-1">
            {filtered.length}{" "}
            {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
            {params.q && ` para "${params.q}"`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <Suspense fallback={<div className="h-80 bg-white rounded-2xl animate-pulse" />}>
              <PropertyFilters />
            </Suspense>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-200">
                <Building2 className="h-16 w-16 text-gray-200 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum imóvel encontrado
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((imovel) => (
                  <PropertyCard key={imovel.id} imovel={imovel} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
