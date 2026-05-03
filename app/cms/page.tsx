import { getAllImoveis } from "@/lib/imoveis";
import CmsClient from "./CmsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS – Gerenciar Imóveis",
};

export default function CmsPage() {
  const imoveis = getAllImoveis();
  return <CmsClient initialImoveis={imoveis} />;
}
