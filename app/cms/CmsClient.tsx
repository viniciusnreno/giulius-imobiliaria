"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Home,
  Search,
  Building2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type Imovel } from "@/lib/imoveis";
import { formatCurrency } from "@/lib/utils";
import ImovelForm from "./ImovelForm";

interface CmsClientProps {
  initialImoveis: Imovel[];
}

export default function CmsClient({ initialImoveis }: CmsClientProps) {
  const [imoveis, setImoveis] = useState<Imovel[]>(initialImoveis);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Imovel | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = imoveis.filter(
    (i) =>
      i.titulo.toLowerCase().includes(search.toLowerCase()) ||
      i.bairro.toLowerCase().includes(search.toLowerCase()) ||
      i.cidade.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (imovel: Imovel) => {
    setEditing(imovel);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este imóvel?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/imoveis/${id}`, { method: "DELETE" });
      if (res.ok) {
        setImoveis((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("Erro ao excluir o imóvel.");
      }
    } catch {
      alert("Erro ao excluir o imóvel.");
    } finally {
      setDeleting(null);
    }
  };

  const handleFormSuccess = (imovel: Imovel) => {
    setImoveis((prev) => {
      const exists = prev.find((i) => i.id === imovel.id);
      if (exists) {
        return prev.map((i) => (i.id === imovel.id ? imovel : i));
      }
      return [...prev, imovel];
    });
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 leading-none">CMS Imóveis</h1>
                <p className="text-xs text-gray-500">Giulius Biaso Imóveis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Voltar ao site
                </Link>
              </Button>
              <Button onClick={handleCreate} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Novo imóvel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total de imóveis",
              value: imoveis.length,
              color: "text-gray-900",
            },
            {
              label: "Para venda",
              value: imoveis.filter((i) => i.tipo === "venda").length,
              color: "text-primary",
            },
            {
              label: "Para locação",
              value: imoveis.filter((i) => i.tipo === "locacao").length,
              color: "text-blue-600",
            },
            {
              label: "Em destaque",
              value: imoveis.filter((i) => i.destaque).length,
              color: "text-amber-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Buscar imóveis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <p className="text-sm text-gray-500 shrink-0">
              {filtered.length}{" "}
              {filtered.length === 1 ? "imóvel" : "imóveis"}
            </p>
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-16 text-center">
            <Building2 className="h-14 w-14 text-gray-200 mb-3" />
            <p className="font-semibold text-gray-700 mb-1">
              Nenhum imóvel encontrado
            </p>
            <p className="text-sm text-gray-400 mb-5">
              {search ? "Tente buscar por outro termo." : "Clique em «Novo imóvel» para começar."}
            </p>
            {!search && (
              <Button onClick={handleCreate} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Novo imóvel
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                      Imóvel
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                      Tipo
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                      Localização
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                      Preço
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                      Destaque
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((imovel) => (
                    <tr key={imovel.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                            {imovel.imagens[0] ? (
                              <Image
                                src={imovel.imagens[0]}
                                alt={imovel.titulo}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm leading-snug">
                              {imovel.titulo}
                            </p>
                            <p className="text-xs text-gray-500 capitalize mt-0.5">
                              {imovel.categoria} • {imovel.area > 0 ? `${imovel.area} m²` : "–"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <Badge
                          variant={imovel.tipo === "venda" ? "venda" : "locacao"}
                        >
                          {imovel.tipo === "venda" ? "Venda" : "Locação"}
                        </Badge>
                      </td>
                      <td className="px-3 py-4">
                        <p className="text-sm text-gray-700">{imovel.bairro}</p>
                        <p className="text-xs text-gray-400">
                          {imovel.cidade}/{imovel.estado}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-semibold text-gray-900 text-sm">
                          {formatCurrency(imovel.preco)}
                        </p>
                        {imovel.tipo === "locacao" && (
                          <p className="text-xs text-gray-400">/mês</p>
                        )}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                            imovel.destaque
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {imovel.destaque ? "★ Destaque" : "Normal"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild variant="ghost" size="icon">
                            <Link
                              href={`/imoveis/${imovel.id}`}
                              target="_blank"
                              title="Ver no site"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(imovel)}
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(imovel.id)}
                            disabled={deleting === imovel.id}
                            title="Excluir"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-gray-100">
              {filtered.map((imovel) => (
                <div key={imovel.id} className="p-4 flex gap-3">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    {imovel.imagens[0] ? (
                      <Image
                        src={imovel.imagens[0]}
                        alt={imovel.titulo}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                        {imovel.titulo}
                      </p>
                      <Badge
                        variant={imovel.tipo === "venda" ? "venda" : "locacao"}
                        className="shrink-0"
                      >
                        {imovel.tipo === "venda" ? "V" : "L"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {imovel.bairro}, {imovel.cidade}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {formatCurrency(imovel.preco)}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button asChild variant="outline" size="sm" className="h-7 text-xs px-2">
                        <Link href={`/imoveis/${imovel.id}`} target="_blank">
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs px-2"
                        onClick={() => handleEdit(imovel)}
                      >
                        <Pencil className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs px-2 text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(imovel.id)}
                        disabled={deleting === imovel.id}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <ImovelForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSuccess={handleFormSuccess}
        editing={editing}
      />
    </div>
  );
}
