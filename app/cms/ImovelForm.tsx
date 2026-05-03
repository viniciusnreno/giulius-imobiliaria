"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { type Imovel } from "@/lib/imoveis";

interface ImovelFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (imovel: Imovel) => void;
  editing: Imovel | null;
}

const emptyForm = {
  titulo: "",
  descricao: "",
  tipo: "venda" as "venda" | "locacao",
  categoria: "casa" as Imovel["categoria"],
  preco: "",
  area: "",
  quartos: "",
  banheiros: "",
  vagas: "",
  endereco: "",
  bairro: "",
  cidade: "",
  estado: "",
  destaque: false,
  imagens: "",
};

export default function ImovelForm({
  open,
  onClose,
  onSuccess,
  editing,
}: ImovelFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editing) {
      setForm({
        titulo: editing.titulo,
        descricao: editing.descricao,
        tipo: editing.tipo,
        categoria: editing.categoria,
        preco: String(editing.preco),
        area: String(editing.area),
        quartos: String(editing.quartos),
        banheiros: String(editing.banheiros),
        vagas: String(editing.vagas),
        endereco: editing.endereco,
        bairro: editing.bairro,
        cidade: editing.cidade,
        estado: editing.estado,
        destaque: editing.destaque,
        imagens: editing.imagens.join("\n"),
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editing, open]);

  const set = (key: keyof typeof emptyForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.titulo.trim()) errs.titulo = "Título é obrigatório";
    if (!form.descricao.trim()) errs.descricao = "Descrição é obrigatória";
    if (!form.preco || isNaN(Number(form.preco)) || Number(form.preco) <= 0)
      errs.preco = "Preço inválido";
    if (!form.bairro.trim()) errs.bairro = "Bairro é obrigatório";
    if (!form.cidade.trim()) errs.cidade = "Cidade é obrigatória";
    if (!form.estado.trim()) errs.estado = "Estado é obrigatório";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    const payload = {
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim(),
      tipo: form.tipo,
      categoria: form.categoria,
      preco: Number(form.preco),
      area: Number(form.area) || 0,
      quartos: Number(form.quartos) || 0,
      banheiros: Number(form.banheiros) || 0,
      vagas: Number(form.vagas) || 0,
      endereco: form.endereco.trim(),
      bairro: form.bairro.trim(),
      cidade: form.cidade.trim(),
      estado: form.estado.trim(),
      destaque: form.destaque,
      imagens: form.imagens
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean),
    };

    try {
      const url = editing ? `/api/imoveis/${editing.id}` : "/api/imoveis";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        alert("Erro ao salvar o imóvel.");
        return;
      }
      const saved: Imovel = await res.json();
      onSuccess(saved);
    } catch {
      alert("Erro ao salvar o imóvel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Editar imóvel" : "Novo imóvel"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-5">
            {/* Título */}
            <div>
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={form.titulo}
                onChange={(e) => set("titulo", e.target.value)}
                placeholder="Ex: Casa em Condomínio Fechado"
                className="mt-1"
              />
              {errors.titulo && (
                <p className="text-xs text-red-500 mt-1">{errors.titulo}</p>
              )}
            </div>

            {/* Tipo + Categoria */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo de negócio *</Label>
                <Select
                  value={form.tipo}
                  onValueChange={(v) => set("tipo", v)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venda">Venda</SelectItem>
                    <SelectItem value="locacao">Locação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Categoria *</Label>
                <Select
                  value={form.categoria}
                  onValueChange={(v) => set("categoria", v)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="sobrado">Sobrado</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="chacara">Chácara</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preço + Área */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preco">
                  {form.tipo === "locacao" ? "Aluguel (R$/mês) *" : "Preço (R$) *"}
                </Label>
                <Input
                  id="preco"
                  type="number"
                  min="0"
                  value={form.preco}
                  onChange={(e) => set("preco", e.target.value)}
                  placeholder="850000"
                  className="mt-1"
                />
                {errors.preco && (
                  <p className="text-xs text-red-500 mt-1">{errors.preco}</p>
                )}
              </div>
              <div>
                <Label htmlFor="area">Área (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  min="0"
                  value={form.area}
                  onChange={(e) => set("area", e.target.value)}
                  placeholder="200"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Quartos + Banheiros + Vagas */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quartos">Quartos</Label>
                <Input
                  id="quartos"
                  type="number"
                  min="0"
                  value={form.quartos}
                  onChange={(e) => set("quartos", e.target.value)}
                  placeholder="3"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="banheiros">Banheiros</Label>
                <Input
                  id="banheiros"
                  type="number"
                  min="0"
                  value={form.banheiros}
                  onChange={(e) => set("banheiros", e.target.value)}
                  placeholder="2"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vagas">Vagas</Label>
                <Input
                  id="vagas"
                  type="number"
                  min="0"
                  value={form.vagas}
                  onChange={(e) => set("vagas", e.target.value)}
                  placeholder="2"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Endereço */}
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={form.endereco}
                onChange={(e) => set("endereco", e.target.value)}
                placeholder="Rua das Flores, 100"
                className="mt-1"
              />
            </div>

            {/* Bairro + Cidade + Estado */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  value={form.bairro}
                  onChange={(e) => set("bairro", e.target.value)}
                  placeholder="Centro"
                  className="mt-1"
                />
                {errors.bairro && (
                  <p className="text-xs text-red-500 mt-1">{errors.bairro}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  value={form.cidade}
                  onChange={(e) => set("cidade", e.target.value)}
                  placeholder="São Paulo"
                  className="mt-1"
                />
                {errors.cidade && (
                  <p className="text-xs text-red-500 mt-1">{errors.cidade}</p>
                )}
              </div>
              <div>
                <Label htmlFor="estado">Estado *</Label>
                <Input
                  id="estado"
                  value={form.estado}
                  onChange={(e) => set("estado", e.target.value.toUpperCase())}
                  placeholder="SP"
                  maxLength={2}
                  className="mt-1"
                />
                {errors.estado && (
                  <p className="text-xs text-red-500 mt-1">{errors.estado}</p>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="descricao">Descrição *</Label>
              <Textarea
                id="descricao"
                value={form.descricao}
                onChange={(e) => set("descricao", e.target.value)}
                placeholder="Descreva o imóvel com detalhes..."
                className="mt-1 min-h-[120px]"
              />
              {errors.descricao && (
                <p className="text-xs text-red-500 mt-1">{errors.descricao}</p>
              )}
            </div>

            {/* Imagens */}
            <div>
              <Label htmlFor="imagens">URLs das imagens</Label>
              <Textarea
                id="imagens"
                value={form.imagens}
                onChange={(e) => set("imagens", e.target.value)}
                placeholder="https://exemplo.com/foto1.jpg&#10;https://exemplo.com/foto2.jpg"
                className="mt-1 min-h-[80px] font-mono text-xs"
              />
              <p className="text-xs text-gray-400 mt-1">
                Uma URL por linha. Você pode usar links do Unsplash ou outros.
              </p>
            </div>

            {/* Destaque */}
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <Checkbox
                id="destaque"
                checked={form.destaque}
                onCheckedChange={(checked) =>
                  set("destaque", checked === true)
                }
              />
              <div>
                <Label
                  htmlFor="destaque"
                  className="cursor-pointer font-semibold text-amber-800"
                >
                  Exibir em destaque na página inicial
                </Label>
                <p className="text-xs text-amber-600 mt-0.5">
                  Imóveis em destaque aparecem na seção principal do site.
                </p>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : editing ? "Salvar alterações" : "Criar imóvel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
