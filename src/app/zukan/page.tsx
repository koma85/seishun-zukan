"use client";

import { useState } from "react";
import { monsters } from "@/data/monsters";
import MonsterCard from "@/components/MonsterCard";
import { useZukan } from "@/context/ZukanContext";

type Filter = "all" | "tier1" | "tier2" | "ssr" | "discovered";

export default function ZukanPage() {
  const { isDiscovered } = useZukan();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = monsters.filter((m) => {
    if (filter === "tier1") return m.tier === 1;
    if (filter === "tier2") return m.tier === 2 && !m.ssr;
    if (filter === "ssr") return m.ssr;
    if (filter === "discovered") return isDiscovered(m.id);
    return true;
  });

  const discoveredCount = monsters.filter((m) => isDiscovered(m.id)).length;

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "すべて" },
    { id: "tier1", label: "街" },
    { id: "tier2", label: "ランドマーク" },
    { id: "ssr", label: "SSR" },
    { id: "discovered", label: "発見済み" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-navy">青春図鑑</h1>
        <p className="text-xs text-gray-400 mt-1">
          発見済み {discoveredCount} / {monsters.length} 種
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-150 ${
              filter === f.id
                ? "bg-coral text-white"
                : "bg-white text-gray-500 border border-gray-200 hover:border-coral hover:text-coral"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm">まだ発見がありません</p>
          <p className="text-xs mt-1">診断するか、図鑑を直接見てみよう</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((monster) => (
            <MonsterCard
              key={monster.id}
              monster={monster}
              discovered={isDiscovered(monster.id)}
            />
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-xl p-4 border border-orange-100 text-xs text-gray-500 space-y-1">
        <p className="font-medium text-navy mb-2">図鑑について</p>
        <p>
          🏙️ <strong>街図鑑（10種）</strong>：福岡の主要エリア
        </p>
        <p>
          🏛️ <strong>ランドマーク（8種）</strong>：観光・文化施設
        </p>
        <p>
          ⛩️ <strong>SSR（6種）</strong>：神社仏閣。ラッキーポイント付き
        </p>
        <p className="text-gray-400 pt-1">
          ※ 未発見のモンスターはシルエットで表示。図鑑詳細を開くと発見状態になります。
        </p>
      </div>
    </div>
  );
}
