"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = {
  value: string;
};

export default function CopyButton({ value }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevent link redirect
    e.preventDefault();  // ✅ prevent link navigation

    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
      title="Copy Form ID"
    >
      {copied ? (
        <Check size={16} className="text-green-600 dark:text-green-400" />
      ) : (
        <Copy size={16} className="text-blue-600 dark:text-blue-400" />
      )}
    </button>
  );
}
