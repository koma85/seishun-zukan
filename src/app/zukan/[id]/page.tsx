"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getMonsterById } from "@/data/monsters";
import { useZukan } from "@/context/ZukanContext";
import RadarChart from "@/components/RadarChart";
import ParameterBar from "@/components/ParameterBar";
import MonsterImage from "@/components/MonsterImage";
import { PARAM_META, getFrame, allParamsSorted } from "@/lib/cardFrame";

export default function MonsterDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const monster = getMonsterById(id);
  const { discover, isDiscovered } = useZukan();
  const [luckyPoint, setLuckyPoint] = useState<string | null>(null);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [showDataSource, setShowDataSource] = useState(false);

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

  const frame = getFrame(monster);
  const radarColor = frame.border;
  const allStats = allParamsSorted(monster.parameters);

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

      {/* Hero card（TCGカード風） */}
      <div
        className="relative rounded-2xl overflow-hidden bg-white"
        style={{
          border: `2px solid ${frame.border}`,
          boxShadow: frame.glow,
        }}
      >
        {/* SSR 輝きエフェクト */}
        {monster.ssr && (
          <div className="absolute inset-0 z-20 overflow-hidden rounded-2xl pointer-events-none">
            <div className="ssr-shine" />
          </div>
        )}

        {/* ヘッダーストリップ */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: frame.header }}
        >
          <span className="text-xs font-bold text-white/90 tracking-wide">{frame.label}</span>
          <span className="text-xs text-white/80 font-medium">{monster.attribute}</span>
        </div>

        {/* 画像エリア */}
        <div className="bg-gradient-to-b from-[#FEFBF0] to-white flex justify-center pt-6 pb-3">
          <MonsterImage id={monster.id} name={monster.name} size="lg" />
        </div>

        {/* 名前エリア */}
        <div className="px-5 pb-4 text-center space-y-1">
          <p className="text-xs text-gray-400">{monster.habitat}</p>
          <h1 className="text-2xl font-bold text-navy">{monster.name}</h1>
          <p className="text-xs text-gray-500">{monster.classification}</p>
          <p className="text-sm italic text-gray-600 font-medium pt-1">&quot;{monster.catchCopy}&quot;</p>
        </div>

        {/* 区切り線 */}
        <div className="mx-4 border-t" style={{ borderColor: `${frame.border}55` }} />

        {/* ステータス（6パラメーター全部） */}
        <div className="flex justify-around px-1 py-3">
          {allStats.map(([key, val]) => {
            const meta = PARAM_META[key];
            if (!meta) return null;
            return (
              <div key={key} className="flex flex-col items-center gap-0.5">
                <span className="text-base leading-none">{meta.icon}</span>
                <span className="text-sm font-bold leading-none" style={{ color: meta.hex }}>
                  {val}
                </span>
                <span className="text-[9px] text-gray-400 leading-none">{meta.label}</span>
              </div>
            );
          })}
        </div>
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
      <div
        className="bg-white rounded-2xl p-5"
        style={{ border: `1px solid ${frame.border}40` }}
      >
        <h2 className="text-sm font-bold text-navy mb-4">青春パラメータ</h2>
        <RadarChart parameters={monster.parameters} color={radarColor} />
        <div className="mt-4">
          <ParameterBar parameters={monster.parameters} />
        </div>

        {/* Data source accordion */}
        <button
          onClick={() => setShowDataSource((v) => !v)}
          className="mt-4 flex items-center gap-1 text-xs text-gray-400 hover:text-coral transition-colors w-full"
        >
          <span className={`transition-transform duration-200 ${showDataSource ? "rotate-90" : ""}`}>▶</span>
          <span>どうしてこの数字？</span>
        </button>

        {showDataSource && (
          <div className="mt-3 space-y-3 animate-fade-in border-t border-orange-50 pt-3">
            <p className="text-xs text-gray-500 leading-relaxed">{monster.dataFlavor}</p>
            <ul className="space-y-1">
              {monster.scoringEvidence.map((ev, i) => (
                <li key={i} className="text-xs text-gray-400 flex gap-1.5">
                  <span className="text-coral/60 shrink-0 mt-0.5">・</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1 pt-1">
              {monster.dataSources.map((src) => (
                <span
                  key={src}
                  className="text-xs bg-cream text-gray-400 px-2 py-0.5 rounded-full border border-orange-100"
                >
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}
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
