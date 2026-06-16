"use client";

import Link from "next/link";
import type { Monster } from "@/types";
import MonsterImage from "@/components/MonsterImage";
import { PARAM_META, getFrame, topParams } from "@/lib/cardFrame";

interface Props { monster: Monster; discovered: boolean; }

export default function MonsterCard({ monster, discovered }: Props) {
  const frame = getFrame(monster);

  // ── 未発見：カードの裏面 ──
  if (!discovered) {
    return (
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: `2px solid ${monster.ssr ? "#FFB830" : "#d1d5db"}`,
          boxShadow: monster.ssr ? "0 0 14px rgba(255,184,48,0.4)" : "none",
        }}
      >
        {monster.ssr && (
          <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl pointer-events-none">
            <div className="ssr-shine" />
          </div>
        )}
        <div
          className="relative flex flex-col items-center justify-center gap-2.5 min-h-[200px] px-3 py-5"
          style={{ background: "linear-gradient(160deg, #1a2b4a 0%, #0d1929 100%)" }}
        >
          {/* 斜めストライプ柄 */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "10px 10px",
            }}
          />
          {monster.ssr && (
            <span className="relative z-10 text-[10px] font-bold text-amber-400 border border-amber-400/50 px-2 py-0.5 rounded-full tracking-widest">
              ★ SSR
            </span>
          )}
          <div className="relative z-10 w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
            <span className="text-3xl text-white/20">?</span>
          </div>
          <p className="relative z-10 text-[10px] font-medium text-white/30 tracking-widest">
            未発見
          </p>
        </div>
      </div>
    );
  }

  // ── 発見済み：TCGカード風 ──
  const stats = topParams(monster.parameters, 3);

  return (
    <Link href={`/zukan/${monster.id}`}>
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer bg-white transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02]"
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
          className="flex items-center justify-between px-2.5 py-1.5"
          style={{ background: frame.header }}
        >
          <span className="text-[10px] font-bold text-white/90 tracking-wide">
            {frame.label}
          </span>
          <span className="text-[10px] text-white/80 font-medium">
            {monster.attribute}
          </span>
        </div>

        {/* 画像エリア */}
        <div className="bg-gradient-to-b from-[#FEFBF0] to-white flex justify-center pt-3 pb-1 px-2">
          <MonsterImage id={monster.id} name={monster.name} size="sm" className="rounded-xl" />
        </div>

        {/* 名前エリア */}
        <div className="px-2 pb-1.5 text-center">
          <p className="font-bold text-navy text-sm leading-tight">{monster.name}</p>
          <p className="text-[10px] text-gray-400 leading-snug">{monster.habitat}</p>
        </div>

        {/* 区切り線 */}
        <div className="mx-2 border-t" style={{ borderColor: `${frame.border}55` }} />

        {/* パラメーター（上位3つ） */}
        <div className="flex justify-around px-1 py-2">
          {stats.map(([key, val]) => {
            const meta = PARAM_META[key];
            if (!meta) return null;
            return (
              <div key={key} className="flex flex-col items-center gap-0.5">
                <span className="text-sm leading-none">{meta.icon}</span>
                <span
                  className="text-xs font-bold leading-none"
                  style={{ color: meta.hex }}
                >
                  {val}
                </span>
                <span className="text-[8px] text-gray-400 leading-none">{meta.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
