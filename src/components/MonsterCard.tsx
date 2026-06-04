"use client";

import Link from "next/link";
import type { Monster } from "@/types";
import MonsterImage from "@/components/MonsterImage";

interface MonsterCardProps {
  monster: Monster;
  discovered: boolean;
}

const PARAM_COLORS: Record<string, string> = {
  seishun: "bg-coral",
  iyashi: "bg-mint",
  kodo: "bg-sky",
  chisei: "bg-lavender",
  wakuwaku: "bg-gold",
  yorimichi: "bg-coral/70",
};

const PARAM_LABELS: Record<string, string> = {
  seishun: "青春力",
  iyashi: "癒やし力",
  kodo: "行動力",
  chisei: "知性力",
  wakuwaku: "ワクワク力",
  yorimichi: "寄り道力",
};

function dominantParam(params: Monster["parameters"]): string {
  return Object.entries(params).sort((a, b) => b[1] - a[1])[0][0];
}

export default function MonsterCard({ monster, discovered }: MonsterCardProps) {
  if (!discovered) {
    return (
      <div className="relative bg-white rounded-2xl border-2 border-dashed border-gray-200 p-4 flex flex-col items-center gap-2 opacity-80">
        <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
          <span className="text-3xl text-gray-300">?</span>
        </div>
        <div className="w-24 h-3 bg-gray-200 rounded-full" />
        <div className="w-16 h-2 bg-gray-100 rounded-full" />
        <span className="text-xs text-gray-400 mt-1">未発見</span>
        {monster.ssr && (
          <span className="absolute top-2 right-2 text-xs font-bold text-amber-400">SSR</span>
        )}
      </div>
    );
  }

  const dom = dominantParam(monster.parameters);

  return (
    <Link href={`/zukan/${monster.id}`}>
      <div className="relative bg-white rounded-2xl border-2 border-cream hover:border-coral transition-all duration-200 p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transform">
        {monster.ssr && (
          <span className="absolute top-2 right-2 text-xs font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-full">
            SSR
          </span>
        )}
        <MonsterImage id={monster.id} name={monster.name} size="sm" className="rounded-xl" />
        <div className="text-center">
          <p className="text-xs text-gray-400">{monster.habitat}</p>
          <p className="font-bold text-navy text-sm">{monster.name}</p>
        </div>
        <div
          className={`text-xs px-2 py-0.5 rounded-full text-white font-medium ${PARAM_COLORS[dom] ?? "bg-coral"}`}
        >
          {PARAM_LABELS[dom]}
        </div>
      </div>
    </Link>
  );
}

