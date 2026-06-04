"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getMonsterById } from "@/data/monsters";
import { useZukan } from "@/context/ZukanContext";
import RadarChart from "@/components/RadarChart";
import ParameterBar from "@/components/ParameterBar";
import MonsterImage from "@/components/MonsterImage";
import type { Monster } from "@/types";

const PARAM_COLOR_MAP: Record<string, string> = {
  seishun: "#FF7A5C",
  iyashi: "#5DD9C1",
  kodo: "#5BB8FF",
  chisei: "#B8A9FF",
  wakuwaku: "#FFB830",
  yorimichi: "#FF9E8A",
};

function dominantParamKey(params: Monster["parameters"]): string {
  return Object.entries(params).sort((a, b) => b[1] - a[1])[0][0];
}

export default function MonsterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";
  const monster = getMonsterById(id);
  const { discover, isDiscovered } = useZukan();
  const [luckyPoint, setLuckyPoint] = useState<string | null>(null);
  const [showDiscovery, setShowDiscovery] = useState(false);

  useEffect(() => {
    if (!monster) return;
    const wasDiscovered = isDiscovered(monster.id);
    if (!wasDiscovered) {
      setShowDiscovery(true);
      setTimeout(() => setShowDiscovery(false), 2000);
    }
    discover(monster.id);
  }, [monster, discover, isDiscovered]);

  useEffect(() => {
    if (monster?.luckyPoints) {
      const random = monster.luckyPoints[Math.floor(Math.random() * monster.luckyPoints.length)];
      setLuckyPoint(random);
    }
  }, [monster]);

  if (!monster) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">モンスターが見つかりませんでした</p>
        <Link href="/zukan" className="text-coral text-sm mt-4 inline-block">
          ← 図鑑に戻る
        </Link>
      </div>
    );
  }

  const domKey = dominantParamKey(monster.parameters);
  const radarColor = PARAM_COLOR_MAP[domKey] ?? "#FF7A5C";

  const shareText = `「${monster.name}」を発見しました。\n${monster.ecology}\n#青春モンスター図鑑 #福岡青春生態調査`;
  const shareUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Discovery animation */}
      {showDiscovery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-coral text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl animate-slide-up">
            {monster.ssr ? "✨ SSR発見！" : "🎉 発見！"}
          </div>
        </div>
      )}

      {/* Back link */}
      <Link href="/zukan" className="text-xs text-gray-400 hover:text-coral flex items-center gap-1">
        ← 図鑑一覧
      </Link>

      {/* Card header */}
      <div
        className={`rounded-2xl p-6 text-center space-y-2 ${
          monster.ssr
            ? "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200"
            : "bg-white border border-orange-100"
        }`}
      >
        {monster.ssr && (
          <div className="inline-block bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full mb-1">
            SSR
          </div>
        )}
        <MonsterImage id={monster.id} name={monster.name} size="lg" className="mx-auto" />
        <div>
          <p className="text-xs text-gray-400">{monster.habitat}</p>
          <h1 className="text-2xl font-bold text-navy">{monster.name}</h1>
          <p className="text-xs text-gray-500">{monster.classification} / {monster.attribute}</p>
        </div>
        <p className="text-sm italic text-gray-600 font-medium">"{monster.catchCopy}"</p>
      </div>

      {/* Lucky point (SSR only) */}
      {monster.ssr && luckyPoint && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-medium opacity-80 mb-1">🔮 今日のラッキーポイント</p>
          <p className="text-sm font-bold leading-relaxed">{luckyPoint}</p>
          <button
            onClick={() => {
              if (monster.luckyPoints) {
                const random = monster.luckyPoints[Math.floor(Math.random() * monster.luckyPoints.length)];
                setLuckyPoint(random);
              }
            }}
            className="mt-3 text-xs opacity-80 hover:opacity-100 underline"
          >
            もう一度引く
          </button>
        </div>
      )}

      {/* Radar chart */}
      <div className="bg-white rounded-2xl p-5 border border-orange-100">
        <h2 className="text-sm font-bold text-navy mb-4">青春パラメータ</h2>
        <RadarChart parameters={monster.parameters} color={radarColor} />
        <div className="mt-4">
          <ParameterBar parameters={monster.parameters} />
        </div>
      </div>

      {/* Ecology */}
      <div className="bg-white rounded-2xl p-5 border border-orange-100 space-y-3">
        <h2 className="text-sm font-bold text-navy">生態</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{monster.ecology}</p>
      </div>

      {/* Research note */}
      <div className="bg-cream rounded-2xl p-5 border border-orange-100 space-y-3 notebook-bg">
        <h2 className="text-sm font-bold text-navy">📋 研究ノート</h2>
        <p className="text-xs text-gray-500">
          分類：{monster.researchNote.classification}
        </p>
        <ul className="space-y-2">
          {monster.researchNote.observations.map((obs, i) => (
            <li key={i} className="text-xs text-gray-600 flex gap-2">
              <span className="text-coral shrink-0">▶</span>
              <span>{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Data flavor & sources */}
      <div className="bg-white rounded-2xl p-5 border border-orange-100 space-y-3">
        <h2 className="text-sm font-bold text-navy">データ由来</h2>
        <p className="text-xs text-gray-500 leading-relaxed">{monster.dataFlavor}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {monster.dataSources.map((src) => (
            <span
              key={src}
              className="text-xs bg-cream text-gray-500 px-2 py-0.5 rounded-full border border-orange-100"
            >
              {src}
            </span>
          ))}
        </div>
      </div>

      {/* SNS share */}
      <div className="bg-white rounded-2xl p-5 border border-orange-100 space-y-3">
        <h2 className="text-sm font-bold text-navy">シェアする</h2>
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <span>𝕏</span>
          <span>Xで発見を報告する</span>
        </a>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Link
          href="/zukan"
          className="flex-1 text-center py-3 border border-coral text-coral rounded-xl text-sm font-medium hover:bg-coral/5 transition-colors"
        >
          図鑑に戻る
        </Link>
        <Link
          href="/diagnosis"
          className="flex-1 text-center py-3 bg-coral text-white rounded-xl text-sm font-medium hover:bg-coral/80 transition-colors"
        >
          診断してみる
        </Link>
      </div>
    </div>
  );
}
