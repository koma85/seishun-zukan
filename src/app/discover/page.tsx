"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { monsters } from "@/data/monsters";
import { useZukan } from "@/context/ZukanContext";
import type { Monster, Parameters } from "@/types";

// ─── 気分定義 ───────────────────────────────────────────
const MOODS = [
  { id: "relax",   label: "ゆっくりしたい",     emoji: "🌿", param: "iyashi"    as keyof Parameters, color: "bg-mint/20 border-mint hover:bg-mint/30" },
  { id: "explore", label: "どこか出かけたい",   emoji: "🚀", param: "kodo"      as keyof Parameters, color: "bg-sky/20 border-sky hover:bg-sky/30" },
  { id: "excite",  label: "ワクワクしたい",     emoji: "✨", param: "wakuwaku"  as keyof Parameters, color: "bg-gold/20 border-gold hover:bg-gold/30" },
  { id: "think",   label: "静かに考えたい",     emoji: "📚", param: "chisei"    as keyof Parameters, color: "bg-lavender/20 border-lavender hover:bg-lavender/30" },
] as const;

const PARAM_COLOR: Record<string, string> = {
  iyashi:   "#5DD9C1",
  kodo:     "#5BB8FF",
  wakuwaku: "#FFB830",
  chisei:   "#B8A9FF",
  seishun:  "#FF7A5C",
  yorimichi:"#FF9E8A",
};

// ─── ユーティリティ ──────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function topByParam(
  pool: Monster[],
  param: keyof Parameters,
  count: number
): Monster[] {
  return [...pool].sort((a, b) => b.parameters[param] - a.parameters[param]).slice(0, count);
}

function makeChoices(correct: Monster): string[] {
  const others = shuffle(monsters.filter((m) => m.id !== correct.id)).slice(0, 3);
  return shuffle([correct.habitat, ...others.map((m) => m.habitat)]);
}

// ─── シルエットカード ────────────────────────────────────
function SilhouetteCard({
  monster,
  selected,
  onClick,
}: {
  monster: Monster;
  selected: boolean;
  onClick: () => void;
}) {
  const dominantParam = Object.entries(monster.parameters).sort(
    (a, b) => b[1] - a[1]
  )[0][0] as keyof Parameters;
  const color = PARAM_COLOR[dominantParam] ?? "#FF7A5C";

  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl p-4 border-2 flex flex-col items-center gap-3 transition-all duration-200 w-full ${
        selected
          ? "border-coral bg-coral/5 scale-105"
          : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-md"
      }`}
    >
      {monster.ssr && (
        <span className="absolute top-2 right-2 text-xs font-bold text-amber-400">SSR</span>
      )}
      {/* シルエット */}
      <div
        className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl"
        style={{ background: `${color}22` }}
      >
        <span style={{ filter: "brightness(0) opacity(0.15)" }} className="text-4xl">
          👤
        </span>
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs text-gray-300 font-medium">???</p>
        <span
          className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
          style={{ backgroundColor: color }}
        >
          {monster.attribute}
        </span>
      </div>
      <p className="text-xs text-gray-300">
        {monster.tier === 1 ? "街" : monster.ssr ? "SSR" : "ランドマーク"}
      </p>
    </button>
  );
}

// ─── メインページ ────────────────────────────────────────
type Step = "mood" | "silhouette" | "quiz" | "result";

export default function DiscoverPage() {
  const { isDiscovered, discover } = useZukan();
  const [step, setStep] = useState<Step>("mood");
  const [selectedMood, setSelectedMood] = useState<(typeof MOODS)[number] | null>(null);
  const [candidates, setCandidates] = useState<Monster[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [answered, setAnswered] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const undiscovered = useMemo(
    () => monsters.filter((m) => !isDiscovered(m.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step]
  );

  // すべて発見済み
  if (undiscovered.length === 0) {
    return (
      <div className="text-center py-16 space-y-4 animate-fade-in">
        <div className="text-5xl">🎉</div>
        <h1 className="text-xl font-bold text-navy">全モンスター発見済み！</h1>
        <p className="text-sm text-gray-500">あなたは伝説の青春研究員です。</p>
        <Link href="/zukan" className="inline-block bg-coral text-white px-6 py-3 rounded-xl text-sm font-medium">
          図鑑を見る
        </Link>
      </div>
    );
  }

  // ── Step 1: 気分選択 ──────────────────────────────────
  function handleMoodSelect(mood: (typeof MOODS)[number]) {
    setSelectedMood(mood);
    const pool = undiscovered.length >= 3
      ? topByParam(undiscovered, mood.param, 3)
      : undiscovered.slice(0, 3);
    setCandidates(shuffle(pool));
    setStep("silhouette");
  }

  // ── Step 2: シルエット選択 ───────────────────────────
  function handleSilhouetteSelect(monster: Monster) {
    setSelectedMonster(monster);
    setChoices(makeChoices(monster));
    setAnswered(null);
    setIsCorrect(false);
    setStep("quiz");
  }

  // ── Step 3: クイズ回答 ───────────────────────────────
  function handleAnswer(choice: string) {
    if (answered) return;
    setAnswered(choice);
    const correct = choice === selectedMonster!.habitat;
    setIsCorrect(correct);
    if (correct) {
      discover(selectedMonster!.id);
      setTimeout(() => setStep("result"), 800);
    }
  }

  function handleRetry() {
    setAnswered(null);
    setIsCorrect(false);
  }

  function handleReset() {
    setStep("mood");
    setSelectedMood(null);
    setCandidates([]);
    setSelectedMonster(null);
    setChoices([]);
    setAnswered(null);
    setIsCorrect(false);
  }

  // ── Render ───────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ステップインジケーター */}
      <div className="flex items-center gap-2">
        {(["mood", "silhouette", "quiz", "result"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold transition-all ${
                s === step
                  ? "bg-coral text-white"
                  : ["mood", "silhouette", "quiz", "result"].indexOf(step) >
                    ["mood", "silhouette", "quiz", "result"].indexOf(s)
                  ? "bg-coral/30 text-coral"
                  : "bg-gray-100 text-gray-300"
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && <div className="w-6 h-px bg-gray-200" />}
          </div>
        ))}
        <span className="text-xs text-gray-400 ml-1">
          {{ mood: "気分を選ぶ", silhouette: "シルエットを選ぶ", quiz: "観察を確認", result: "発見！" }[step]}
        </span>
      </div>

      {/* ── Step 1 ── */}
      {step === "mood" && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-xl font-bold text-navy">今の気分は？</h1>
            <p className="text-xs text-gray-400 mt-1">
              気分に合った青春モンスターを探します
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood)}
                className={`rounded-2xl border-2 p-5 flex flex-col items-center gap-2 transition-all duration-150 ${mood.color}`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-sm font-medium text-navy">{mood.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400">
            未発見モンスター残り {undiscovered.length} / {monsters.length} 種
          </p>
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === "silhouette" && selectedMood && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <button onClick={() => setStep("mood")} className="text-xs text-gray-400 hover:text-coral mb-2 flex items-center gap-1">
              ← 気分を選び直す
            </button>
            <h1 className="text-xl font-bold text-navy">
              {selectedMood.emoji} {selectedMood.label}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              あなたの気分に合う生物が観測されています。
              <br />気になるシルエットをひとつ選んでください。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {candidates.map((monster) => (
              <SilhouetteCard
                key={monster.id}
                monster={monster}
                selected={false}
                onClick={() => handleSilhouetteSelect(monster)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3 ── */}
      {step === "quiz" && selectedMonster && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-xl font-bold text-navy">観察記録を確認</h1>
            <p className="text-xs text-gray-400 mt-1">
              フィールドノートに残された記述を読んで答えてください
            </p>
          </div>

          {/* ヒントカード */}
          <div className="bg-cream rounded-2xl p-5 border border-orange-100 space-y-2 notebook-bg">
            <p className="text-xs text-gray-400 font-medium">📋 観察記録より</p>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              「{selectedMonster.researchNote.observations[0]}」
            </p>
          </div>

          {/* 問題 */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-navy">
              この生物の生息地はどこ？
            </p>
            <div className="space-y-2">
              {choices.map((choice) => {
                let style = "border-gray-100 bg-gray-50 text-gray-600 hover:border-coral/40";
                if (answered) {
                  if (choice === selectedMonster.habitat) {
                    style = "border-mint bg-mint/10 text-mint font-bold";
                  } else if (choice === answered && !isCorrect) {
                    style = "border-red-300 bg-red-50 text-red-400";
                  } else {
                    style = "border-gray-100 bg-gray-50 text-gray-300";
                  }
                }
                return (
                  <button
                    key={choice}
                    onClick={() => handleAnswer(choice)}
                    disabled={!!answered}
                    className={`w-full text-left p-4 rounded-xl border-2 text-sm transition-all duration-150 ${style}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 不正解フィードバック */}
          {answered && !isCorrect && (
            <div className="bg-red-50 rounded-xl p-4 space-y-3 animate-fade-in">
              <p className="text-sm text-red-400 font-medium">
                惜しい！もう一度観察してみよう。
              </p>
              <button
                onClick={handleRetry}
                className="w-full py-3 border border-coral text-coral rounded-xl text-sm font-medium hover:bg-coral/5 transition-colors"
              >
                もう一度答える
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Step 4: 発見！ ── */}
      {step === "result" && selectedMonster && (
        <div className="space-y-6 animate-slide-up text-center">
          <div className="bg-gradient-to-br from-coral/10 to-gold/10 rounded-2xl p-8 border border-coral/20 space-y-4">
            <p className="text-coral font-bold text-sm">
              {selectedMonster.ssr ? "✨ SSR発見！" : "🎉 発見！"}
            </p>
            <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-cream to-coral/10 flex items-center justify-center">
              <img
                src={`/images/monsters/${selectedMonster.id}.png`}
                alt={selectedMonster.name}
                className="w-32 h-32 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <p className="text-xs text-gray-400">{selectedMonster.habitat}</p>
              <h2 className="text-2xl font-bold text-navy">{selectedMonster.name}</h2>
              <p className="text-xs text-gray-500 mt-1">{selectedMonster.classification}</p>
            </div>
            <p className="text-sm italic text-gray-600">"{selectedMonster.catchCopy}"</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/zukan/${selectedMonster.id}`}
              className="text-center py-3 bg-coral text-white rounded-xl text-sm font-medium hover:bg-coral/80 transition-colors"
            >
              図鑑で詳しく見る
            </Link>
            <button
              onClick={handleReset}
              className="text-center py-3 border border-coral text-coral rounded-xl text-sm font-medium hover:bg-coral/5 transition-colors"
            >
              もう1体探す
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
