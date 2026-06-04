import type { DiagnosisQuestion, DiagnosisType } from "@/types";

export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 1,
    question: "週末の理想の過ごし方は？",
    options: [
      { label: "気になる路地をじっくり歩いて回る", scores: { yorimichi: 3, iyashi: 2 } },
      { label: "地図を持たずにどこまでも行ってみる", scores: { kodo: 3, seishun: 2 } },
      { label: "好きな本や美術を静かに楽しむ", scores: { chisei: 3, yorimichi: 2 } },
      { label: "人が集まるにぎやかな場所へ出かける", scores: { wakuwaku: 3, seishun: 2 } },
    ],
  },
  {
    id: 2,
    question: "旅先でまず向かうのは？",
    options: [
      { label: "ガイドブックに載っていない小さなカフェ", scores: { yorimichi: 3, chisei: 2 } },
      { label: "地元の屋台や市場のにぎわい", scores: { wakuwaku: 3, seishun: 2 } },
      { label: "緑豊かな公園や川のそば", scores: { iyashi: 3, yorimichi: 2 } },
      { label: "交通を使って街をくまなく回る", scores: { kodo: 3, seishun: 2 } },
    ],
  },
  {
    id: 3,
    question: "あなたのエネルギー源は？",
    options: [
      { label: "知らない場所に踏み込む興奮", scores: { kodo: 3, wakuwaku: 2 } },
      { label: "静かな場所でひとり思索する時間", scores: { chisei: 3, iyashi: 2 } },
      { label: "友達と賑やかに過ごす時間", scores: { seishun: 3, wakuwaku: 2 } },
      { label: "気まぐれに路地をさまよう時間", scores: { yorimichi: 3, iyashi: 2 } },
    ],
  },
  {
    id: 4,
    question: "福岡で好きな雰囲気は？",
    options: [
      { label: "屋台や繁華街のにぎわい", scores: { wakuwaku: 3, kodo: 2 } },
      { label: "公園や緑地のゆったりした空気", scores: { iyashi: 3, chisei: 2 } },
      { label: "古い街並みと新しい文化が混ざる路地", scores: { chisei: 3, yorimichi: 2 } },
      { label: "どこへでもすぐ行けるアクセスの良さ", scores: { kodo: 3, seishun: 2 } },
    ],
  },
  {
    id: 5,
    question: "青春といえば？",
    options: [
      { label: "目的なくひたすら歩いた記憶", scores: { yorimichi: 3, kodo: 2 } },
      { label: "夢中になれるものを探していた日々", scores: { wakuwaku: 3, chisei: 2 } },
      { label: "仲間と過ごした笑いあふれる時間", scores: { seishun: 3, iyashi: 2 } },
      { label: "自然の中で見つけた特別な場所", scores: { iyashi: 3, yorimichi: 2 } },
    ],
  },
];

export const diagnosisTypes: DiagnosisType[] = [
  {
    id: "native",
    dominantParam: "seishun",
    label: "青春純正種",
    description:
      "あなたは青春のど真ん中を全力で生きるタイプ。人との繋がりやエネルギッシュな場所に引き寄せられる。",
    compatibleMonsters: ["kashii", "hakozaki-shrine", "nishijin"],
  },
  {
    id: "healer",
    dominantParam: "iyashi",
    label: "癒やし系研究員",
    description:
      "自然や静かな場所に心の安らぎを見つける。急がず、ゆっくりと街の空気を味わうのが得意。",
    compatibleMonsters: ["ohori-park", "marine-world", "atago-shrine"],
  },
  {
    id: "explorer",
    dominantParam: "kodo",
    label: "行動派研究員",
    description:
      "移動することが好奇心への答え。行けるなら行く、やれるならやる。フットワークの軽さが武器。",
    compatibleMonsters: ["hakata-station", "tenjin", "kego-shrine"],
  },
  {
    id: "scholar",
    dominantParam: "chisei",
    label: "文献型研究員",
    description:
      "場所の奥にある歴史や文化に惹かれる。知れば知るほど好きになる、深掘り型の青春研究員。",
    compatibleMonsters: ["kushida-shrine", "sumiyoshi-shrine", "ropponmatsu"],
  },
  {
    id: "enthusiast",
    dominantParam: "wakuwaku",
    label: "熱血型研究員",
    description:
      "いつでも全力でワクワクを追いかける。イベントや新しい体験に目がなく、熱量が周囲に伝染する。",
    compatibleMonsters: ["canal-city", "paypay-dome", "momochi"],
  },
  {
    id: "wanderer",
    dominantParam: "yorimichi",
    label: "寄り道系研究員",
    description:
      "目的地より途中の発見が好き。計画のない散歩から生まれる偶然の出会いを大切にする。",
    compatibleMonsters: ["yakuin", "hirao", "ropponmatsu"],
  },
];

export function getDiagnosisType(typeId: string): DiagnosisType | undefined {
  return diagnosisTypes.find((t) => t.id === typeId);
}
