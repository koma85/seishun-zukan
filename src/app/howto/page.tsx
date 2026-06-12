"use client";

import { useState } from "react";
import Link from "next/link";

// ─── アコーディオン共通部品 ──────────────────────────────
function Step({
  num, emoji, title, isOpen, onToggle, children,
}: {
  num: number; emoji: string; title: string;
  isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/60 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center shrink-0">
          {num}
        </div>
        <span className="text-xl shrink-0">{emoji}</span>
        <span className="font-bold text-navy text-sm flex-1 text-left">{title}</span>
        <span
          className={`text-gray-300 text-xs transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        >
          ▶
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-orange-50 px-4 pb-5 pt-4 space-y-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── ページ本体 ──────────────────────────────────────────
export default function HowToPage() {
  const [open, setOpen] = useState<number[]>([1]);

  const toggle = (n: number) =>
    setOpen((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-navy">遊び方ガイド</h1>
        <p className="text-xs text-gray-400 mt-1">青春研究員になるための4ステップ</p>
      </div>

      <div className="space-y-3">

        {/* ─── Step 1: 診断 ─── */}
        <Step num={1} emoji="🧬" title="診断してタイプを知ろう" isOpen={open.includes(1)} onToggle={() => toggle(1)}>
          {/* ビジュアル: クイズモックアップ */}
          <div className="bg-cream rounded-xl p-4 space-y-2.5">
            <p className="text-xs font-bold text-navy text-center mb-1">Q. 週末どこ行く？</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { t: "天神でショッピング", sel: true },
                { t: "大濠公園でのんびり", sel: false },
                { t: "屋台を食べ歩き",     sel: false },
                { t: "図書館で読書",       sel: false },
              ].map(({ t, sel }) => (
                <div
                  key={t}
                  className={`rounded-xl p-2.5 text-xs text-center font-medium border-2 ${
                    sel ? "border-coral bg-coral/10 text-coral" : "border-gray-100 bg-white text-gray-500"
                  }`}
                >
                  {t}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-center text-gray-400">全5問、1分以内で完了します</p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            5問の質問に答えるだけで、あなたの「青春タイプ」がわかります。
            タイプに合ったモンスターが
            <strong className="text-coral">自動で図鑑に登録</strong>
            されるので、まずここから始めるのがおすすめです。
          </p>
          <Link
            href="/diagnosis"
            className="inline-block bg-coral text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-coral/80 transition-colors"
          >
            診断してみる →
          </Link>
        </Step>

        {/* ─── Step 2: 探索 ─── */}
        <Step num={2} emoji="🔭" title="3ステップでモンスターを発見" isOpen={open.includes(2)} onToggle={() => toggle(2)}>
          {/* ビジュアル: フロー図 */}
          <div className="bg-cream rounded-xl p-3">
            <div className="flex items-stretch gap-1">
              {[
                { bg: "bg-mint/40",    e: "🌿", l: "気分を\n選ぶ" },
                null,
                { bg: "bg-sky/30",    e: "👤", l: "シルエット\n選択" },
                null,
                { bg: "bg-gold/30",   e: "❓", l: "クイズ\n正解" },
                null,
                { bg: "bg-coral/20",  e: "🎉", l: "発見！" },
              ].map((item, i) =>
                item ? (
                  <div key={i} className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 flex-1 ${item.bg}`}>
                    <span className="text-xl">{item.e}</span>
                    <p className="text-[8px] text-gray-500 leading-tight whitespace-pre-line text-center">
                      {item.l}
                    </p>
                  </div>
                ) : (
                  <span key={i} className="text-gray-300 text-sm self-center shrink-0">›</span>
                )
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            「今の気分」を選んで → 気になるシルエットを1体選んで →
            観察記録のヒントをもとに生息地クイズに正解すると、
            <strong className="text-coral">新しいモンスターが図鑑に登録</strong>されます。
            不正解でも「もう一度」でやり直せます。
          </p>
          <Link
            href="/discover"
            className="inline-block bg-sky text-white text-xs font-bold px-5 py-2.5 rounded-full hover:opacity-80 transition-opacity"
          >
            探索する →
          </Link>
        </Step>

        {/* ─── Step 3: 図鑑 ─── */}
        <Step num={3} emoji="📖" title="図鑑を埋めよう" isOpen={open.includes(3)} onToggle={() => toggle(3)}>
          {/* ビジュアル: 発見済み vs 未発見カード */}
          <div className="grid grid-cols-2 gap-3">
            {/* 発見済みカード（テンジニアンのミニ版） */}
            <div
              className="rounded-xl border-2 overflow-hidden"
              style={{ borderColor: "#5BB8FF", boxShadow: "0 4px 12px rgba(91,184,255,0.25)" }}
            >
              <div
                className="flex justify-between items-center px-2 py-1"
                style={{ background: "linear-gradient(135deg, #5BB8FF, #5DD9C1)" }}
              >
                <span className="text-[9px] font-bold text-white">🏙 街</span>
                <span className="text-[9px] text-white/80">賑わい</span>
              </div>
              <div className="bg-gradient-to-b from-[#FEFBF0] to-white flex justify-center pt-2 pb-1">
                <img
                  src="/images/monsters/tenjin.png"
                  alt="テンジニアン"
                  className="w-14 h-14 object-contain rounded-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="bg-white px-1 pb-1 text-center">
                <p className="font-bold text-navy text-[10px]">テンジニアン</p>
                <p className="text-[8px] text-gray-400">天神</p>
              </div>
              <div className="mx-1.5 border-t" style={{ borderColor: "rgba(91,184,255,0.3)" }} />
              <div className="flex justify-around px-1 py-1.5 bg-white">
                {[{ e: "⚡", v: 93, c: "#5BB8FF" }, { e: "✨", v: 90, c: "#FFB830" }, { e: "🗺️", v: 90, c: "#FF9E8A" }].map(({ e, v, c }) => (
                  <div key={e} className="flex flex-col items-center gap-0.5">
                    <span className="text-xs">{e}</span>
                    <span className="text-[9px] font-bold" style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 未発見カード */}
            <div
              className="rounded-xl border-2 border-gray-200 overflow-hidden flex flex-col items-center justify-center gap-2 min-h-[140px]"
              style={{ background: "linear-gradient(160deg, #1a2b4a, #0d1929)" }}
            >
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                <span className="text-2xl text-white/20">?</span>
              </div>
              <p className="text-[9px] text-white/30 font-medium tracking-widest">未発見</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            図鑑には全<strong className="text-coral">24種</strong>のモンスターがいます。
            街エリア10種・ランドマーク8種・SSR神社仏閣6種の構成です。
            SSRの6体はとくに入手しにくいレア種——全制覇を目指しましょう。
          </p>
          <Link
            href="/zukan"
            className="inline-block bg-navy text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-navy/80 transition-colors"
          >
            図鑑を見る →
          </Link>
        </Step>

        {/* ─── Step 4: シェア ─── */}
        <Step num={4} emoji="𝕏" title="発見をシェアしよう" isOpen={open.includes(4)} onToggle={() => toggle(4)}>
          {/* ビジュアル: シェア例 */}
          <div className="bg-black rounded-xl p-4 space-y-2.5">
            <p className="text-[10px] text-gray-400 font-medium">ポスト例</p>
            <p className="text-xs text-white leading-relaxed">
              「テンジニアン」を発見しました。<br />
              渋滞する交差点が、この街の心臓だ。
            </p>
            <p className="text-xs font-medium" style={{ color: "#5BB8FF" }}>
              #青春モンスター図鑑　#福岡青春生態調査
            </p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            各モンスターの詳細ページ下部の「Xで発見を報告する」ボタンから投稿できます。
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            「ここちょっと違うかも」「このモンスターめっちゃわかる！」などの感想は、
            ハッシュタグ <strong className="text-coral">#青春モンスター図鑑</strong> をつけて
            投稿してもらえると、開発の参考になってとても助かります。
          </p>
        </Step>

      </div>

      {/* ─── スタートCTA ─── */}
      <div className="bg-gradient-to-br from-coral/10 to-gold/10 rounded-2xl p-6 text-center space-y-3 border border-coral/20">
        <p className="text-3xl">🔬</p>
        <p className="font-bold text-navy">さあ、青春研究員として出発しよう！</p>
        <p className="text-xs text-gray-400">まず診断、次に探索。コンプリートを目指してね。</p>
        <div className="flex gap-3 justify-center pt-1">
          <Link
            href="/diagnosis"
            className="bg-coral text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-coral/80 transition-colors"
          >
            診断する
          </Link>
          <Link
            href="/discover"
            className="bg-white border-2 border-coral text-coral text-xs font-bold px-5 py-2.5 rounded-full hover:bg-coral/5 transition-colors"
          >
            探索する
          </Link>
        </div>
      </div>
    </div>
  );
}
