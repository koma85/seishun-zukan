"use client";

import type { Parameters } from "@/types";

const PARAM_LABELS: { key: keyof Parameters; label: string }[] = [
  { key: "seishun", label: "青春力" },
  { key: "kodo", label: "行動力" },
  { key: "wakuwaku", label: "ワクワク力" },
  { key: "yorimichi", label: "寄り道力" },
  { key: "chisei", label: "知性力" },
  { key: "iyashi", label: "癒やし力" },
];

const N = PARAM_LABELS.length;
const W = 260;
const H = 220;
const CX = W / 2;
const CY = H / 2;
const MAX_RADIUS = 72;
const LABEL_OFFSET = 22;

function polarToCartesian(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

function makePolygonPoints(values: number[]): string {
  return values
    .map((v, i) => {
      const angle = (360 / N) * i;
      const r = (v / 100) * MAX_RADIUS;
      const { x, y } = polarToCartesian(angle, r);
      return `${x},${y}`;
    })
    .join(" ");
}

interface RadarChartProps {
  parameters: Parameters;
  color?: string;
}

export default function RadarChart({ parameters, color = "#FF7A5C" }: RadarChartProps) {
  const values = PARAM_LABELS.map((p) => parameters[p.key]);
  const polygonPoints = makePolygonPoints(values);

  const gridLevels = [25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs mx-auto">
      {/* Grid circles */}
      {gridLevels.map((level) => {
        const gridPoints = Array.from({ length: N }, (_, i) => {
          const angle = (360 / N) * i;
          const r = (level / 100) * MAX_RADIUS;
          const { x, y } = polarToCartesian(angle, r);
          return `${x},${y}`;
        }).join(" ");
        return (
          <polygon
            key={level}
            points={gridPoints}
            fill="none"
            stroke="#E5E0D8"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {PARAM_LABELS.map((_, i) => {
        const angle = (360 / N) * i;
        const { x, y } = polarToCartesian(angle, MAX_RADIUS);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke="#E5E0D8"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={polygonPoints}
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {values.map((v, i) => {
        const angle = (360 / N) * i;
        const r = (v / 100) * MAX_RADIUS;
        const { x, y } = polarToCartesian(angle, r);
        return (
          <circle key={i} cx={x} cy={y} r="3" fill={color} />
        );
      })}

      {/* Labels */}
      {PARAM_LABELS.map((p, i) => {
        const angle = (360 / N) * i;
        const { x, y } = polarToCartesian(angle, MAX_RADIUS + LABEL_OFFSET);
        const textAnchor =
          Math.abs(x - CX) < 5 ? "middle" : x < CX ? "end" : "start";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fontSize="9"
            fill="#1A2B4A"
            fontWeight="500"
          >
            {p.label}
          </text>
        );
      })}
    </svg>
  );
}
