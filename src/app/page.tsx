"use client";

import Link from "next/link";
import { useZukan } from "@/context/ZukanContext";
import { monsters } from "@/data/monsters";
import { diagnosisTypes } from "@/data/diagnosis";

export default function TopPage() {
  const { state } = useZukan();
  const discoveredCount = state.discoveredIds.length;
  const totalCount = monsters.length;
  const diagnosisResult = state.diagnosisResult;
  const diagnosisType = diagnosisResult
    ? diagnosisTypes.find((t) => t.id === diagnosisResult.typeId)
    : null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="text-center py-8 space-y-4">
        <div className="text-5xl mb-2">🔬</div>
        <h1 className="text-2xl font-bold text-navy leading-tight">
          青春モンスター図鑑
          <span className="block text-coral text-lg font-normal mt-1">FUKUOKA</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
          福岡の街を「青春生物」として観察する図鑑。
          <br />
          あなたは青春研究員として、24種の青春モンスターを発見しよう。
        </p>
      </section>

      {/* Progress */}
      <section className="bg-white rounded-2xl p-5 border border-orange-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-500">発見済みモンスター</span>
          <span className="text-sm font-bold text-coral">
            {discoveredCount} / {totalCount}
          </span>
        </div>
        <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-coral rounded-full transition-all duration-700"
            style={{ width: `${(discoveredCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {discoveredCount === 0
            ? "まだ図鑑が空です。診断か図鑑から始めよう！"
            : discoveredCount === totalCount
            ? "全種発見！あなたは伝説の青春研究員だ。"
            : `残り ${totalCount - discoveredCount} 種を発見しよう`}
        </p>
      </section>

      {/* Diagnosis result preview */}
      {diagnosisType && (
        <section className="bg-gradient-to-br from-coral/10 to-lavender/10 rounded-2xl p-5 border border-coral/20">
          <p className="text-xs text-gray-500 mb-1">あなたの診断結果</p>
          <p className="font-bold text-navy text-lg">「{diagnosisType.label}」</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{diagnosisType.description}</p>
          <Link
            href="/diagnosis/result"
            className="inline-block mt-3 text-xs text-coral font-medium hover:underline"
          >
            詳細を見る →
          </Link>
        </section>
      )}

      {/* Action buttons */}
      <section className="space-y-3">
        <Link href="/discover">
          <div className="bg-coral text-white rounded-2xl p-5 text-center hover:bg-coral/80 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 transform cursor-pointer">
            <div className="text-3xl mb-2">🔭</div>
            <p className="font-bold text-sm">モンスターを探索する</p>
            <p className="text-xs opacity-80 mt-1">今の気分からシルエットを選んで発見</p>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/diagnosis">
            <div className="bg-navy text-white rounded-2xl p-5 text-center hover:bg-navy/80 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 transform cursor-pointer">
              <div className="text-2xl mb-1">🧬</div>
              <p className="font-bold text-sm">診断する</p>
              <p className="text-xs opacity-80 mt-1">5問でタイプ診断</p>
            </div>
          </Link>
          <Link href="/zukan">
            <div className="bg-white border-2 border-navy text-navy rounded-2xl p-5 text-center hover:bg-cream transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 transform cursor-pointer">
              <div className="text-2xl mb-1">📖</div>
              <p className="font-bold text-sm">図鑑を見る</p>
              <p className="text-xs opacity-60 mt-1">24種を確認</p>
            </div>
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="bg-white rounded-2xl p-5 border border-orange-100 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-navy text-sm">このサービスについて</h2>
          <Link href="/howto" className="text-xs text-coral font-medium hover:underline">
            遊び方を見る →
          </Link>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          福岡市のオープンデータ（人口動態・交通・施設・飲食店など）をエンタメ向けに解析し、
          街や施設の個性を「青春生物」として可視化しています。
        </p>
        <div className="grid grid-cols-3 gap-2 text-center pt-2">
          {[
            { emoji: "🏙️", label: "街図鑑", count: "10種" },
            { emoji: "🏛️", label: "ランドマーク", count: "8種" },
            { emoji: "⛩️", label: "SSR神社仏閣", count: "6種" },
          ].map((item) => (
            <div key={item.label} className="bg-cream rounded-xl p-3">
              <div className="text-xl mb-1">{item.emoji}</div>
              <p className="text-xs font-medium text-navy">{item.label}</p>
              <p className="text-xs text-coral font-bold">{item.count}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
