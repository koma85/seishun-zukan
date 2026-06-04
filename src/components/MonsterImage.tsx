"use client";

import { useState } from "react";

const EMOJI_MAP: Record<string, string> = {
  tenjin: "🏙️",
  hakata: "⛩️",
  nishijin: "🛍️",
  ropponmatsu: "📚",
  ohashi: "🌿",
  kashii: "🌊",
  meinohama: "🚉",
  yakuin: "☕",
  hirao: "🌸",
  momochi: "🗼",
  "fukuoka-tower": "📡",
  "paypay-dome": "⚾",
  "hakata-station": "🚅",
  "canal-city": "🌊",
  "ohori-park": "🦢",
  "maizuru-park": "🌸",
  "marine-world": "🐬",
  aburayama: "🌲",
  "kushida-shrine": "🏮",
  tochoji: "🙏",
  "hakozaki-shrine": "⛩️",
  "sumiyoshi-shrine": "🎋",
  "kego-shrine": "🔮",
  "atago-shrine": "🌅",
};

interface MonsterImageProps {
  id: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES = {
  sm: { wrapper: "w-20 h-20", emoji: "text-4xl", img: "w-20 h-20" },
  md: { wrapper: "w-28 h-28", emoji: "text-5xl", img: "w-28 h-28" },
  lg: { wrapper: "w-40 h-40", emoji: "text-7xl", img: "w-40 h-40" },
};

export default function MonsterImage({ id, name, size = "md", className = "" }: MonsterImageProps) {
  const [imgError, setImgError] = useState(false);
  const sizes = SIZE_CLASSES[size];

  return (
    <div
      className={`${sizes.wrapper} rounded-2xl bg-gradient-to-br from-cream to-coral/10 flex items-center justify-center overflow-hidden ${className}`}
    >
      {!imgError ? (
        <img
          src={`/images/monsters/${id}.png`}
          alt={name}
          className={`${sizes.img} object-contain`}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={sizes.emoji}>{EMOJI_MAP[id] ?? "✨"}</span>
      )}
    </div>
  );
}
