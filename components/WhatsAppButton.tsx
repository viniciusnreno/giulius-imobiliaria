"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vim pelo site e gostaria de mais informações sobre imóveis.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <MessageCircle className="h-6 w-6 fill-white" />
        <span className="text-sm font-semibold hidden sm:block">Falar no WhatsApp</span>
      </div>
    </a>
  );
}
