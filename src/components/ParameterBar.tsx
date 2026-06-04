"use client";

import type { Parameters } from "@/types";

const PARAMS: { key: keyof Parameters; label: string; color: string }[] = [
  { key: "seishun", label: "青春力", color: "#FF7A5C" },
  { key: "iyashi", label: "癒やし力", color: "#5DD9C1" },
  { key: "kodo", label: "行動力", color: "#5BB8FF" },
  { key: "chisei", label: "知性力", color: "#B8A9FF" },
  { key: "wakuwaku", label: "ワクワク力", color: "#FFB830" },
  { key: "yorimichi", label: "寄り道力", color: "#FF9E8A" },
];

interface ParameterBarProps {
  parameters: Parameters;
}

export default function ParameterBar({ parameters }: ParameterBarProps) {
  return (
    <div className="space-y-2">
      {PARAMS.map(({ key, label, color }) => {
        const value = parameters[key];
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-20 text-right shrink-0">{label}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${value}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-xs font-bold text-navy w-8 shrink-0">{value}</span>
          </div>
        );
      })}
    </div>
  );
}
