"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { diagnosisQuestions } from "@/data/diagnosis";
import { useZukan } from "@/context/ZukanContext";
import type { Parameters, DiagnosisTypeId } from "@/types";
import { diagnosisTypes } from "@/data/diagnosis";

type Scores = Parameters;

const EMPTY_SCORES: Scores = {
  seishun: 0,
  iyashi: 0,
  kodo: 0,
  chisei: 0,
  wakuwaku: 0,
  yorimichi: 0,
};

const PARAM_TO_DIAGNOSIS: Record<keyof Parameters, DiagnosisTypeId> = {
  seishun: "native",
  iyashi: "healer",
  kodo: "explorer",
  chisei: "scholar",
  wakuwaku: "enthusiast",
  yorimichi: "wanderer",
};

const TIE_PRIORITY: Array<keyof Parameters> = [
  "kodo",
  "wakuwaku",
  "seishun",
  "yorimichi",
  "iyashi",
  "chisei",
];

function calcDiagnosisType(scores: Scores): DiagnosisTypeId {
  const entries = Object.entries(scores) as [keyof Scores, number][];
  const maxScore = Math.max(...entries.map(([, v]) => v));
  const tiedParams = entries
    .filter(([, v]) => v === maxScore)
    .map(([k]) => k as keyof Parameters);

  if (tiedParams.length === 1) {
    return PARAM_TO_DIAGNOSIS[tiedParams[0]];
  }

  for (const param of TIE_PRIORITY) {
    if (tiedParams.includes(param)) {
      return PARAM_TO_DIAGNOSIS[param];
    }
  }

  return "native";
}

export default function DiagnosisPage() {
  const router = useRouter();
  const { saveDiagnosisResult, discoverMultiple } = useZukan();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({ ...EMPTY_SCORES });
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = diagnosisQuestions[currentQ];
  const isLast = currentQ === diagnosisQuestions.length - 1;
  const progress = ((currentQ) / diagnosisQuestions.length) * 100;

  function handleSelect(optionIndex: number) {
    if (animating) return;
    setSelected(optionIndex);
  }

  function handleNext() {
    if (selected === null || animating) return;
    setAnimating(true);

    const option = question.options[selected];
    const newScores = { ...scores };
    for (const [key, val] of Object.entries(option.scores)) {
      newScores[key as keyof Scores] += val as number;
    }

    setTimeout(() => {
      if (isLast) {
        const typeId = calcDiagnosisType(newScores);
        const diagnosisType = diagnosisTypes.find((t) => t.id === typeId);

        saveDiagnosisResult({
          typeId,
          scores: newScores,
          timestamp: Date.now(),
        });

        if (diagnosisType) {
          discoverMultiple(diagnosisType.compatibleMonsters);
        }

        router.push("/diagnosis/result");
      } else {
        setScores(newScores);
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setAnimating(false);
      }
    }, 400);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-navy">青春タイプ診断</h1>
        <p className="text-xs text-gray-400 mt-1">
          5問に答えて、あなたの青春研究員タイプを発見しよう
        </p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>
            {currentQ + 1} / {diagnosisQuestions.length} 問目
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-coral rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        className={`bg-white rounded-2xl p-6 border border-orange-100 shadow-sm transition-opacity duration-300 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="font-bold text-navy text-lg leading-relaxed mb-6">
          Q{currentQ + 1}. {question.question}
        </p>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 text-sm leading-relaxed ${
                selected === i
                  ? "border-coral bg-coral/5 text-coral font-medium"
                  : "border-gray-100 bg-gray-50 text-gray-600 hover:border-coral/40 hover:bg-coral/5"
              }`}
            >
              <span className="font-bold mr-2 text-gray-300">
                {["A", "B", "C", "D"][i]}.
              </span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={selected === null || animating}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 ${
          selected !== null && !animating
            ? "bg-coral text-white hover:bg-coral/80 hover:shadow-lg"
            : "bg-gray-100 text-gray-300 cursor-not-allowed"
        }`}
      >
        {isLast ? "診断結果を見る" : "次の問いへ →"}
      </button>

      {/* Type preview */}
      <div className="bg-cream rounded-xl p-4 border border-orange-100">
        <p className="text-xs text-gray-400 mb-2">診断タイプ（6種）</p>
        <div className="flex flex-wrap gap-1">
          {diagnosisTypes.map((t) => (
            <span
              key={t.id}
              className="text-xs bg-white text-gray-500 px-2 py-0.5 rounded-full border border-gray-100"
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
