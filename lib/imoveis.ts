import fs from "fs";
import path from "path";

export type TipoImovel = "venda" | "locacao";
export type CategoriaImovel =
  | "casa"
  | "apartamento"
  | "sobrado"
  | "terreno"
  | "studio"
  | "comercial"
  | "chacara"
  | "outro";

export interface Imovel {
  id: string;
  titulo: string;
  descricao: string;
  tipo: TipoImovel;
  categoria: CategoriaImovel;
  preco: number;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  destaque: boolean;
  imagens: string[];
  criadoEm: string;
}

const DATA_PATH = path.join(process.cwd(), "data", "imoveis.json");

function readData(): Imovel[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Imovel[];
  } catch {
    return [];
  }
}

function writeData(imoveis: Imovel[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(imoveis, null, 2), "utf-8");
}

export function getAllImoveis(): Imovel[] {
  return readData();
}

export function getImoveisDestaque(): Imovel[] {
  return readData().filter((i) => i.destaque);
}

export function getImovelById(id: string): Imovel | undefined {
  return readData().find((i) => i.id === id);
}

export function createImovel(data: Omit<Imovel, "id" | "criadoEm">): Imovel {
  const imoveis = readData();
  const newId = String(
    imoveis.length > 0 ? Math.max(...imoveis.map((i) => Number(i.id))) + 1 : 1
  );
  const imovel: Imovel = {
    ...data,
    id: newId,
    criadoEm: new Date().toISOString(),
  };
  imoveis.push(imovel);
  writeData(imoveis);
  return imovel;
}

export function updateImovel(
  id: string,
  data: Partial<Omit<Imovel, "id" | "criadoEm">>
): Imovel | null {
  const imoveis = readData();
  const idx = imoveis.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  imoveis[idx] = { ...imoveis[idx], ...data };
  writeData(imoveis);
  return imoveis[idx];
}

export function deleteImovel(id: string): boolean {
  const imoveis = readData();
  const idx = imoveis.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  imoveis.splice(idx, 1);
  writeData(imoveis);
  return true;
}
