import { NextRequest, NextResponse } from "next/server";
import { getAllImoveis, createImovel } from "@/lib/imoveis";

export async function GET() {
  const imoveis = getAllImoveis();
  return NextResponse.json(imoveis);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const imovel = createImovel(body);
    return NextResponse.json(imovel, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}
