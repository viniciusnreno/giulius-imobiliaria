"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex-1 py-2 text-center text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          Copiado!
        </>
      ) : (
        "Copiar link"
      )}
    </button>
  );
}
