import type { Monster } from "@/types";

// ─── パラメーターアイコン定義（カード共通）─────────────────
export const PARAM_META: Record<string, { icon: string; label: string; hex: string }> = {
  seishun:   { icon: "🌸", label: "青春",    hex: "#FF7A5C" },
  iyashi:    { icon: "🌿", label: "癒し",    hex: "#5DD9C1" },
  kodo:      { icon: "⚡", label: "行動",    hex: "#5BB8FF" },
  chisei:    { icon: "📖", label: "知性",    hex: "#B8A9FF" },
  wakuwaku:  { icon: "✨", label: "ワクワク", hex: "#FFB830" },
  yorimichi: { icon: "🗺️", label: "寄道",    hex: "#FF9E8A" },
};

// ─── カード枠スタイル（ティア別・共通）─────────────────────
export const FRAME = {
  ssr: {
    border: "#FFB830",
    glow:   "0 0 18px rgba(255,184,48,0.5), 0 4px 14px rgba(255,184,48,0.25)",
    header: "linear-gradient(135deg, #FFB830 0%, #FF7A5C 100%)",
    label:  "⛩ SSR",
  },
  tier2: {
    border: "#B8A9FF",
    glow:   "0 4px 14px rgba(184,169,255,0.3)",
    header: "linear-gradient(135deg, #B8A9FF 0%, #5BB8FF 100%)",
    label:  "🏛 ランドマーク",
  },
  tier1: {
    border: "#5BB8FF",
    glow:   "0 4px 12px rgba(91,184,255,0.25)",
    header: "linear-gradient(135deg, #5BB8FF 0%, #5DD9C1 100%)",
    label:  "🏙 街",
  },
} as const;

export type CardFrame = typeof FRAME[keyof typeof FRAME];

export function getFrame(m: Monster): CardFrame {
  return m.ssr ? FRAME.ssr : m.tier === 1 ? FRAME.tier1 : FRAME.tier2;
}

export function topParams(params: Monster["parameters"], n = 3): [string, number][] {
  return (Object.entries(params) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

export function allParamsSorted(params: Monster["parameters"]): [string, number][] {
  return (Object.entries(params) as [string, number][]).sort((a, b) => b[1] - a[1]);
}
