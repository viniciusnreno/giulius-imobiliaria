import { NextRequest, NextResponse } from "next/server";
import { getImovelById, updateImovel, deleteImovel } from "@/lib/imoveis";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const imovel = getImovelById(id);
  if (!imovel) {
    return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 });
  }
  return NextResponse.json(imovel);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updateImovel(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteImovel(id);
  if (!deleted) {
    return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
