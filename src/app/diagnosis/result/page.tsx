"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useZukan } from "@/context/ZukanContext";
import { getDiagnosisType } from "@/data/diagnosis";
import { getMonsterById } from "@/data/monsters";
import MonsterCard from "@/components/MonsterCard";

const TYPE_EMOJI: Record<string, string> = {
  native: "🌟",
  healer: "🌿",
  explorer: "🚀",
  scholar: "📚",
  enthusiast: "🔥",
  wanderer: "🗺️",
};

const TYPE_BG: Record<string, string> = {
  native: "from-coral/20 to-orange-50",
  healer: "from-mint/20 to-teal-50",
  explorer: "from-sky/20 to-blue-50",
  scholar: "from-lavender/20 to-purple-50",
  enthusiast: "from-gold/20 to-yellow-50",
  wanderer: "from-coral/10 to-pink-50",
};

export default function DiagnosisResultPage() {
  const router = useRouter();
  const { state, isDiscovered } = useZukan();
  const result = state.diagnosisResult;

  useEffect(() => {
    if (!result) {
      router.replace("/diagnosis");
    }
  }, [result, router]);

  if (!result) return null;

  const diagnosisType = getDiagnosisType(result.typeId);
  if (!diagnosisType) return null;

  const compatibleMonsters = diagnosisType.compatibleMonsters
    .map((id) => getMonsterById(id))
    .filter(Boolean);

  const bgGradient = TYPE_BG[result.typeId] ?? "from-coral/10 to-cream";
  const emoji = TYPE_EMOJI[result.typeId] ?? "✨";

  const shareText = `私は「${diagnosisType.label}」でした。\n相性のいい場所は${compatibleMonsters.map((m) => m?.habitat).join("・")}。\n#青春モンスター図鑑 #福岡青春生態調査`;
  const shareUrl = encodeURIComponent(
    typeof window !== "undefined" ? `${window.location.origin}/diagnosis/result` : ""
  );
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`;

  const maxScore = Math.max(...Object.values(result.scores));
  const paramLabels: Record<string, string> = {
    seishun: "青春力",
    iyashi: "癒やし力",
    kodo: "行動力",
    chisei: "知性力",
    wakuwaku: "ワクワク力",
    yorimichi: "寄り道力",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Result card */}
      <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 text-center space-y-3 border border-orange-100`}>
        <p className="text-xs text-gray-500">あなたの青春研究員タイプは</p>
        <div className="text-6xl">{emoji}</div>
        <h1 className="text-2xl font-bold text-navy">「{diagnosisType.label}」</h1>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
          {diagnosisType.description}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="bg-white rounded-2xl p-5 border border-orange-100">
        <h2 className="text-sm font-bold text-navy mb-4">青春パラメータ分布</h2>
        <div className="space-y-2">
          {Object.entries(result.scores)
            .sort((a, b) => b[1] - a[1])
            .map(([key, score]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24 text-right shrink-0">
                  {paramLabels[key]}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-coral transition-all duration-700"
                    style={{ width: `${(score / maxScore) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-navy w-4 shrink-0">{score}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Compatible monsters */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-navy">
          相性の良い青春モンスター
          <span className="text-xs font-normal text-gray-400 ml-2">（自動発見済み）</span>
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {compatibleMonsters.map((monster) =>
            monster ? (
              <MonsterCard key={monster.id} monster={monster} discovered={isDiscovered(monster.id)} />
            ) : null
          )}
        </div>
      </div>

      {/* SNS share */}
      <div className="bg-white rounded-2xl p-5 border border-orange-100 space-y-3">
        <h2 className="text-sm font-bold text-navy">結果をシェア</h2>
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <span>𝕏</span>
          <span>Xでシェアする</span>
        </a>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/diagnosis"
          className="text-center py-3 border border-coral text-coral rounded-xl text-sm font-medium hover:bg-coral/5 transition-colors"
        >
          もう一度診断
        </Link>
        <Link
          href="/zukan"
          className="text-center py-3 bg-coral text-white rounded-xl text-sm font-medium hover:bg-coral/80 transition-colors"
        >
          図鑑を見る
        </Link>
      </div>

      {/* Reset */}
      <div className="text-center">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 underline">
          トップに戻る
        </Link>
      </div>
    </div>
  );
}
