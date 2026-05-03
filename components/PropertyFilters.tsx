"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categorias = [
  { value: "todos", label: "Todas as categorias" },
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "sobrado", label: "Sobrado" },
  { value: "studio", label: "Studio" },
  { value: "terreno", label: "Terreno" },
  { value: "comercial", label: "Comercial" },
  { value: "chacara", label: "Chácara" },
];

const ordenacao = [
  { value: "recente", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "maior-area", label: "Maior área" },
];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "todos") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (key: string, value: string | null) => {
    const qs = createQueryString({ [key]: value });
    router.push(`/imoveis${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem("q") as HTMLInputElement).value;
    handleChange("q", q);
  };

  const hasFilters =
    searchParams.has("tipo") ||
    searchParams.has("categoria") ||
    searchParams.has("q");

  const clearFilters = () => {
    router.push("/imoveis");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-gray-900">Filtros</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Limpar
          </button>
        )}
      </div>

      {/* Busca */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            name="q"
            type="search"
            placeholder="Buscar por título, bairro..."
            defaultValue={searchParams.get("q") ?? ""}
            className="pl-9"
          />
        </div>
      </form>

      {/* Tipo */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Tipo de negócio
        </p>
        <div className="flex gap-2">
          {[
            { value: "", label: "Todos" },
            { value: "venda", label: "Venda" },
            { value: "locacao", label: "Locação" },
          ].map((opt) => {
            const active = (searchParams.get("tipo") ?? "") === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleChange("tipo", opt.value || null)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium border transition-all ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categoria */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Categoria
        </p>
        <Select
          value={searchParams.get("categoria") ?? "todos"}
          onValueChange={(val) => handleChange("categoria", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            {categorias.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ordenação */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Ordenar por
        </p>
        <Select
          value={searchParams.get("ordem") ?? "recente"}
          onValueChange={(val) => handleChange("ordem", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Mais recentes" />
          </SelectTrigger>
          <SelectContent>
            {ordenacao.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full"
        size="sm"
      >
        Ver todos os imóveis
      </Button>
    </div>
  );
}
