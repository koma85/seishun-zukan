import type { Monster } from "@/types";

const commonDataSources = [
  "福岡市人口動態調査（2026年4月）",
  "都市公園データ（2018年）",
  "スポーツ施設データ（2025年）",
  "地下鉄乗車人員統計（令和6年度）",
  "図書館データ（2025年）",
  "飲食店営業許可データ（2026年4月）",
  "屋台オープンデータ（2026年5月）",
];

const landmarkDataSources = [
  "福岡市観光情報（2025年）",
  "都市公園データ（2018年）",
  "スポーツ施設データ（2025年）",
  "地下鉄乗車人員統計（令和6年度）",
  "文化施設データ（2025年）",
  "飲食店営業許可データ（2026年4月）",
];

export const monsters: Monster[] = [
  // ─── Tier 1: 街（10件）───
  {
    id: "tenjin",
    tier: 1,
    ssr: false,
    name: "テンジニアン",
    habitat: "天神",
    classification: "商業型回遊種",
    attribute: "賑わい属性",
    catchCopy: "渋滞する交差点が、この街の心臓だ。",
    ecology:
      "人波のエネルギーを動力源に変え、地上と地下を絶えず往来する。賑わいが密集するほど個体の活性が高まる習性がある。",
    researchNote: {
      classification: "都市回遊型行動種",
      observations: [
        "百貨店と地下街の接続点付近で最も高密度に観測される",
        "昼夜問わず移動を続け、目的地よりも回遊そのものを楽しんでいるように見える",
        "ハカタリウスとは行動圏が隣接しており、週末には混合群を形成する",
      ],
    },
    parameters: { seishun: 53, iyashi: 36, kodo: 93, chisei: 30, wakuwaku: 90, yorimichi: 90 },
    dataFlavor:
      "地下鉄乗車数が10エリア中最高水準。飲食店・屋台の密集度も突出しており、行動力・ワクワク力・寄り道力の三冠を記録",
    dataSources: commonDataSources,
    compatibility: ["explorer", "enthusiast", "wanderer"],
  },
  {
    id: "hakata",
    tier: 1,
    ssr: false,
    name: "ハカタリウス",
    habitat: "博多",
    classification: "都市型群生種",
    attribute: "活気属性",
    catchCopy: "千年続く祭りの街は、止まり方を知らない。",
    ecology:
      "古い歴史の層を踏みしめながら常に前へ進む、移動と定住の両本能を同時に持つ稀有な種。祭りの季節に最大まで活性化する。",
    researchNote: {
      classification: "交差型青春種",
      observations: [
        "駅と寺と屋台が混在するエリアを好み、どの時間帯も密度が安定している",
        "新幹線ホームと路地裏を同等の頻度で行き来する行動パターンが確認されている",
        "春と夏に個体エネルギーが急上昇し、博多祇園山笠の期間中は別個体かと見まがうほど変容する",
      ],
    },
    parameters: { seishun: 74, iyashi: 55, kodo: 88, chisei: 55, wakuwaku: 79, yorimichi: 72 },
    dataFlavor:
      "新幹線・JR・地下鉄が交差する結節点補正を加算。転入者数の多さと多業態飲食集積が「玄関口の活気」を数値化",
    dataSources: commonDataSources,
    compatibility: ["explorer", "native", "enthusiast"],
  },
  {
    id: "nishijin",
    tier: 1,
    ssr: false,
    name: "ニシジーノ",
    habitat: "西新",
    classification: "住宅型共生種",
    attribute: "生活属性",
    catchCopy: "商店街のアーケードが、今日も青春を守っている。",
    ecology:
      "アーケードの屋根の下で育ち、地元民のルーティンに溶け込むことで安定するタイプ。外部からの刺激より日常の連続を好む。",
    researchNote: {
      classification: "地元定着型青春種",
      observations: [
        "西新商店街のアーケード内を最も自然な生息域としており、雨の日も活動量が落ちない",
        "高校生と主婦層と老齢個体が同じ空間に混在する、珍しい共存生態が観察されている",
        "天神方面へ移動した個体が数時間後に戻ってくる帰巣行動が確認されている",
      ],
    },
    parameters: { seishun: 68, iyashi: 30, kodo: 54, chisei: 30, wakuwaku: 31, yorimichi: 40 },
    dataFlavor:
      "転入者数と商店街エリアの飲食密度から若者エネルギーの高さを判定。区単位データの粗さを信頼係数で調整済み",
    dataSources: commonDataSources,
    compatibility: ["native", "explorer", "wanderer"],
  },
  {
    id: "ropponmatsu",
    tier: 1,
    ssr: false,
    name: "ロッポマイン",
    habitat: "六本松",
    classification: "学術型探索種",
    attribute: "思索属性",
    catchCopy: "大学が去ってから、この街は静かに賢くなった。",
    ecology:
      "書物とコーヒーの香りが漂う環境を好み、一点に長時間とどまりながら内側で活発に動き続ける特異な種。知的刺激で寄り道が増える。",
    researchNote: {
      classification: "知性探索型定住種",
      observations: [
        "独立系書店とカフェが隣接するブロックを核として行動圏を形成している",
        "平日昼間に単独行動する個体が多く、長時間同一店舗に滞在する記録がある",
        "九大移転後も学術的気配が残存しており、新世代の知的個体が継続的に流入している",
      ],
    },
    parameters: { seishun: 35, iyashi: 35, kodo: 30, chisei: 78, wakuwaku: 32, yorimichi: 62 },
    dataFlavor:
      "九大移転後の学術街補正・最低保証を適用。データが捕捉しにくい学生集積とカフェ密度を知性力・寄り道力に反映",
    dataSources: commonDataSources,
    compatibility: ["scholar", "wanderer", "native"],
  },
  {
    id: "ohashi",
    tier: 1,
    ssr: false,
    name: "オオハシアン",
    habitat: "大橋",
    classification: "住宅型定住種",
    attribute: "安定属性",
    catchCopy: "急がない街に、ちょうどいい青春がある。",
    ecology:
      "大きな幹線道路と住宅街が混在する地帯を巣とし、過度な刺激を避けて穏やかなペースで生活する。癒しの場を本能的に探し当てる能力が高い。",
    researchNote: {
      classification: "郊外安定型癒し種",
      observations: [
        "大型商業施設の周辺より、路地に面した個人店付近での目撃例が多い",
        "移動速度が他の都市型種より明らかに遅く、立ち止まり時間が長い",
        "天神・博多方面からの転入個体が落ち着きを取り戻す場所として機能している",
      ],
    },
    parameters: { seishun: 47, iyashi: 55, kodo: 48, chisei: 30, wakuwaku: 30, yorimichi: 39 },
    dataFlavor:
      "南区の豊富な公園数とスポーツ施設が癒やし力を支える。七隈線沿線らしい落ち着きのある数値分布",
    dataSources: commonDataSources,
    compatibility: ["healer", "native", "explorer"],
  },
  {
    id: "kashii",
    tier: 1,
    ssr: false,
    name: "カシリオン",
    habitat: "香椎",
    classification: "住宅型群生種",
    attribute: "活力属性",
    catchCopy: "海に近い街の子どもは、目線が遠い。",
    ecology:
      "若い世代が多く集まる住宅密集地を好み、群れを作ることでエネルギーを増幅させる。自然環境との距離が近く、癒しと活力を同時に帯びている。",
    researchNote: {
      classification: "沿岸群生型青春種",
      observations: [
        "海側と住宅側の両方向に行動圏を持つ、二方向型の生態が観察されている",
        "子連れ個体の比率が市内平均より高く、次世代への引き継ぎが活発に行われている",
        "夏季に海浜方面へ大規模移動し、秋に戻る季節的回遊が確認されている",
      ],
    },
    parameters: { seishun: 90, iyashi: 65, kodo: 39, chisei: 62, wakuwaku: 40, yorimichi: 50 },
    dataFlavor:
      "東区は転入・出生・公園・施設すべてで市内トップクラス。上限キャップで他エリアとのバランスを保ちつつ青春力は群を抜く",
    dataSources: commonDataSources,
    compatibility: ["native", "healer", "scholar"],
  },
  {
    id: "meinohama",
    tier: 1,
    ssr: false,
    name: "メイハーヴ",
    habitat: "姪浜",
    classification: "水辺型定住種",
    attribute: "静穏属性",
    catchCopy: "終着駅の先に、本当の余白がある。",
    ecology:
      "路線の末端という地理的特性から外部流入が少なく、内部で独自の生態系を完成させた種。知的好奇心と穏やかさを同時に持つ。",
    researchNote: {
      classification: "末端定着型癒し種",
      observations: [
        "海沿いのエリアと図書館・スポーツ施設の両方に生息域を持つ複合型の生態が見られる",
        "外部からの刺激に反応しにくい一方、地元コミュニティ内での結束が非常に強い",
        "冬季でも活動量が落ちず、他の水辺型種より季節変動が小さい",
      ],
    },
    parameters: { seishun: 37, iyashi: 80, kodo: 45, chisei: 60, wakuwaku: 33, yorimichi: 44 },
    dataFlavor:
      "公園・スポーツ施設の充実と文化補正が癒やし力80を実現。図書館2館が知性力も底上げ。のんびり海側住宅街の実態に即した分布",
    dataSources: commonDataSources,
    compatibility: ["healer", "scholar", "explorer"],
  },
  {
    id: "yakuin",
    tier: 1,
    ssr: false,
    name: "ヤクイーヌ",
    habitat: "薬院",
    classification: "商業型共生種",
    attribute: "洗練属性",
    catchCopy: "夜が更けても、この街の電球は消えない。",
    ecology:
      "セレクトショップと居酒屋が混在する路地を生息域とし、昼と夜で全く異なる顔を持つ二面性の種。立ち寄りを誘う磁場を自ら発生させている。",
    researchNote: {
      classification: "路地寄道型商業種",
      observations: [
        "幹線道路より一本入った路地に密集しており、看板のない店を好む傾向がある",
        "深夜になっても活動を続ける夜型個体の比率が市内で最も高い",
        "天神から流れてきた個体が、ここで初めて立ち止まる現象が繰り返し観察されている",
      ],
    },
    parameters: { seishun: 53, iyashi: 30, kodo: 30, chisei: 30, wakuwaku: 47, yorimichi: 72 },
    dataFlavor:
      "飲食許可数では表現しきれないカフェ・セレクトショップ密集を最低保証で補完。深夜の寄り道文化が寄り道力72を形成",
    dataSources: commonDataSources,
    compatibility: ["wanderer", "enthusiast", "native"],
  },
  {
    id: "hirao",
    tier: 1,
    ssr: false,
    name: "ヒラオーン",
    habitat: "平尾",
    classification: "住宅型定住種",
    attribute: "日常属性",
    catchCopy: "特別じゃない毎日が、一番長く続く青春だ。",
    ecology:
      "派手さのない住宅街の中に自分だけの寄り道ルートを作り、それを毎日少しずつ更新していく習慣がある。青春力は控えめだが持続力が高い。",
    researchNote: {
      classification: "路地探索型定住種",
      observations: [
        "大通りより生活道路を好み、同じルートを通るたびに異なる発見をしている様子が見られる",
        "単独行動が基本で、群れを形成することはほとんどない",
        "薬院・平尾間を行き来する個体が多く、両エリアの境界が曖昧になっている",
      ],
    },
    parameters: { seishun: 48, iyashi: 36, kodo: 39, chisei: 30, wakuwaku: 30, yorimichi: 55 },
    dataFlavor:
      "住宅街の隠れ家カフェ文化をキャラ補正・最低保証で数値化。閑静さの中の寄り道力が個性",
    dataSources: commonDataSources,
    compatibility: ["wanderer", "native", "explorer"],
  },
  {
    id: "momochi",
    tier: 1,
    ssr: false,
    name: "モモチア",
    habitat: "百道",
    classification: "水辺型回遊種",
    attribute: "解放属性",
    catchCopy: "海と塔と芝生が揃った街に、足が向く理由がある。",
    ecology:
      "文化施設・海浜・スポーツ施設の三点を結ぶトライアングルを回遊し続ける種。知的好奇心とエンターテインメント欲求を同時に満たす環境に最適化している。",
    researchNote: {
      classification: "複合回遊型ワクワク種",
      observations: [
        "美術館・博物館・タワーの動線上に沿って移動する、文化施設依存型の行動パターンがある",
        "晴天時に個体密度が急上昇し、雨天時は室内施設へ即座に移動する適応力を持つ",
        "家族単位・カップル単位・単独個体が同じ空間に混在する珍しい多様性が観察されている",
      ],
    },
    parameters: { seishun: 33, iyashi: 31, kodo: 39, chisei: 54, wakuwaku: 68, yorimichi: 30 },
    dataFlavor:
      "福岡タワー・PayPayドーム・海浜公園のイベント感をキャラ・文化補正で反映。ワクワク力が知性力を上回る逆転構造",
    dataSources: commonDataSources,
    compatibility: ["enthusiast", "scholar", "explorer"],
  },

  // ─── Tier 2: ランドマーク 通常（8件）───
  {
    id: "fukuoka-tower",
    tier: 2,
    ssr: false,
    name: "タワリウス",
    habitat: "福岡タワー",
    classification: "複合型群生種",
    attribute: "展望属性",
    catchCopy: "高さ234メートルから見ると、悩みが小さくなる。",
    ecology:
      "高所に生息し、遠くを見渡すことを本能とする種。周囲の複合施設から供給されるエンターテインメントエネルギーを吸収して輝度を維持している。",
    researchNote: {
      classification: "垂直回遊型ワクワク種",
      observations: [
        "百道浜の複合施設群の中心に位置し、周辺施設との相互誘引関係が確認されている",
        "夜間は発光量が増大し、遠方からの個体を引き寄せる灯台的機能を果たしている",
        "海側からアクセスする個体と陸側からの個体が頂上で合流するパターンが観察されている",
      ],
    },
    parameters: { seishun: 33, iyashi: 52, kodo: 55, chisei: 49, wakuwaku: 72, yorimichi: 35 },
    dataFlavor: "観光集客実績と周辺複合施設の密度から、ワクワク力が主軸で行動力が補完する判定となった",
    dataSources: landmarkDataSources,
    compatibility: ["enthusiast", "explorer", "scholar"],
  },
  {
    id: "paypay-dome",
    tier: 2,
    ssr: false,
    name: "ドーミオン",
    habitat: "PayPayドーム",
    classification: "複合型群生種",
    attribute: "熱狂属性",
    catchCopy: "試合がない日でも、この丸い建物は青春を引き寄せる。",
    ecology:
      "大規模群集が発生するとエネルギーが最大化する種。若年個体の比率が高く、集合と解散を繰り返すことで青春力を更新し続けている。",
    researchNote: {
      classification: "集合爆発型青春種",
      observations: [
        "ホークスの試合開催日に最大個体密度を記録し、それ以外の日との差が際立って大きい",
        "コンサートや展示会などの非スポーツイベントでも同様の群集形成が確認されている",
        "解散時に周辺飲食エリアへ流出した個体が翌日も残留するケースが多い",
      ],
    },
    parameters: { seishun: 68, iyashi: 36, kodo: 45, chisei: 30, wakuwaku: 75, yorimichi: 30 },
    dataFlavor: "大規模イベント開催実績と周辺の若年人口流入データから、ワクワク力と青春力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["enthusiast", "native", "explorer"],
  },
  {
    id: "hakata-station",
    tier: 2,
    ssr: false,
    name: "エキタリア",
    habitat: "博多駅",
    classification: "都市型回遊種",
    attribute: "接続属性",
    catchCopy: "どこへでも行ける場所に、ずっといたくなる。",
    ecology:
      "新幹線・地下鉄・バスの全ての路線が交差する最大の結節点に生息し、移動エネルギーそのものを養分とする種。行動力が全種中最高水準。",
    researchNote: {
      classification: "交通結節型行動種",
      observations: [
        "改札口付近で最も高密度に観察され、一日中個体の入れ替わりが続く",
        "目的地に向かう個体と、駅そのものを目的地にしている個体が常に混在している",
        "博多口と筑紫口で生態が微妙に異なる、同種内分化が進んでいる可能性がある",
      ],
    },
    parameters: { seishun: 84, iyashi: 55, kodo: 98, chisei: 65, wakuwaku: 45, yorimichi: 46 },
    dataFlavor:
      "地下鉄・新幹線・バスの乗降者数が市内で断トツとなり、行動力と青春力が最上位に近い値で判定された",
    dataSources: landmarkDataSources,
    compatibility: ["explorer", "native", "scholar"],
  },
  {
    id: "canal-city",
    tier: 2,
    ssr: false,
    name: "キャナルーン",
    habitat: "キャナルシティ",
    classification: "複合型共生種",
    attribute: "回遊属性",
    catchCopy: "水路沿いに歩くと、次の角に必ず何かある。",
    ecology:
      "水路を中心軸に回遊しながら、映画・食事・買い物・休憩を一体として消費する種。立ち止まるよりも流れていることを好む。",
    researchNote: {
      classification: "水路回遊型ワクワク種",
      observations: [
        "運河沿いの通路を時計回りと反時計回りで交互に移動する行動パターンが確認されている",
        "国内外からの個体が高比率で混在し、言語の異なる個体同士が自然に並走することがある",
        "フードコートエリアで長時間の定着が観察され、寄り道衝動が特に高いエリアとなっている",
      ],
    },
    parameters: { seishun: 59, iyashi: 55, kodo: 31, chisei: 58, wakuwaku: 80, yorimichi: 65 },
    dataFlavor:
      "複合商業施設としての面積規模と飲食店種類の多様性から、ワクワク力と寄り道力が共に高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["enthusiast", "wanderer", "scholar"],
  },
  {
    id: "ohori-park",
    tier: 2,
    ssr: false,
    name: "オオホリン",
    habitat: "大濠公園",
    classification: "水辺型定住種",
    attribute: "静息属性",
    catchCopy: "池を一周すると、なぜか気持ちがフラットになる。",
    ecology:
      "大きな水面を中心に緩やかな楕円軌道を繰り返す種。都市の喧騒を外周に感じながら、内側では完全な穏やかさを保つ二重構造の生態を持つ。",
    researchNote: {
      classification: "循環型癒し種",
      observations: [
        "早朝から深夜まで途切れることなく個体が観察される、時間帯非依存型の生息地となっている",
        "ランニング個体・ベンチ静止個体・カヤック個体が同じ水辺で共存している",
        "隣接する美術館との個体交流があり、知的刺激を求めた後に癒しを求めて戻る周期が見られる",
      ],
    },
    parameters: { seishun: 53, iyashi: 92, kodo: 50, chisei: 30, wakuwaku: 30, yorimichi: 47 },
    dataFlavor:
      "水辺緑地の規模と市内中心部からのアクセス良好度が組み合わさり、癒し力と青春力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["healer", "native", "explorer"],
  },
  {
    id: "maizuru-park",
    tier: 2,
    ssr: false,
    name: "マイヅルクス",
    habitat: "舞鶴公園",
    classification: "文化型定住種",
    attribute: "記憶属性",
    catchCopy: "お城の石垣が言う、「ここで咲くものはすべて本物だ」。",
    ecology:
      "歴史的構造物の残滓を栄養源とし、文化と自然が重なる場所で静かに生を営む。知性力が高く、季節の変化に敏感に反応する。",
    researchNote: {
      classification: "歴史共存型癒し種",
      observations: [
        "福岡城跡の石垣沿いを好み、構造物の古さと植生の新しさが混在するゾーンを生息域とする",
        "春の桜期に個体密度が年間最大になり、平時との落差が大きい",
        "美術館来訪後の個体が公園内に流入し、知性から癒しへの移行パターンが観察されている",
      ],
    },
    parameters: { seishun: 53, iyashi: 79, kodo: 50, chisei: 60, wakuwaku: 31, yorimichi: 32 },
    dataFlavor:
      "城跡公園としての面積と隣接する文化施設の数から、癒し力と知性力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["healer", "scholar", "native"],
  },
  {
    id: "marine-world",
    tier: 2,
    ssr: false,
    name: "マリノヴァ",
    habitat: "マリンワールド",
    classification: "水辺型群生種",
    attribute: "驚嘆属性",
    catchCopy: "海の生き物の前では、大人も子どもも同じ顔になる。",
    ecology:
      "海洋生物との接触で青春エネルギーを充電する特殊な種。ファミリー・カップル・単独と多様な形態で観測されるが、全個体が最終的に同じ表情を浮かべる。",
    researchNote: {
      classification: "海洋接触型癒し種",
      observations: [
        "水槽の前で個体が停止し、通常より長い観察行動を取ることが他の生息地より顕著に多い",
        "イルカショー開始時刻に個体の集中と興奮状態が同期する集団現象が確認されている",
        "若年個体と高齢個体が同等の反応強度を示す、年齢差を無効化する空間となっている",
      ],
    },
    parameters: { seishun: 95, iyashi: 98, kodo: 30, chisei: 80, wakuwaku: 65, yorimichi: 43 },
    dataFlavor:
      "観光施設としての入場者数規模と周辺の若年ファミリー人口から、癒し力と青春力が最上位水準で判定された",
    dataSources: landmarkDataSources,
    compatibility: ["healer", "native", "scholar"],
  },
  {
    id: "aburayama",
    tier: 2,
    ssr: false,
    name: "アブラザウル",
    habitat: "油山",
    classification: "自然型単独種",
    attribute: "原生属性",
    catchCopy: "街が見える山に登れば、街への愛着が深まる。",
    ecology:
      "市街地を見下ろす山頂に単独で生息する種。高い癒し力を持ちながらアクセスに一定の移動コストを要するため、真剣に求める個体のみが到達できる。",
    researchNote: {
      classification: "高地単独型癒し種",
      observations: [
        "山頂付近では常に単独行動が基本で、群れを形成しない唯一の種となっている",
        "麓のファームから山頂へ向かう移動中に個体のエネルギーが段階的に高まる現象がある",
        "福岡市内の全方位を眺望できる地点に定位する習性があり、都市への帰属意識が強い",
      ],
    },
    parameters: { seishun: 30, iyashi: 90, kodo: 42, chisei: 30, wakuwaku: 30, yorimichi: 30 },
    dataFlavor:
      "山系緑地としての面積と市街地からの高度差から、癒し力が最大級で行動力が補助的に機能する判定となった",
    dataSources: landmarkDataSources,
    compatibility: ["healer", "explorer", "native"],
  },

  // ─── Tier 2: ランドマーク SSR（6件）───
  {
    id: "kushida-shrine",
    tier: 2,
    ssr: true,
    name: "クシダミコト",
    habitat: "櫛田神社",
    classification: "聖域型守護種",
    attribute: "祭礼属性",
    catchCopy: "千年前から、この神社は博多の夏を呼んでいる。",
    ecology:
      "博多祇園山笠の総本社として蓄積された文化的知性を身にまとい、日常と祭礼の両面で街を守護する種。青春エネルギーを最も強く帯びたSSR個体。",
    researchNote: {
      classification: "祭礼守護型知性種",
      observations: [
        "山笠展示スペース周辺で年間を通じて観察されるが、7月の密度は他月の数倍に達する",
        "参拝目的の個体と観光目的の個体が混在しているが、境内に入ると両者の行動が収束する",
        "博多旧市街に生息する複数種と深い関係性を持ち、文化的知識の中継点として機能している",
      ],
    },
    parameters: { seishun: 84, iyashi: 55, kodo: 31, chisei: 98, wakuwaku: 60, yorimichi: 36 },
    dataFlavor:
      "祭礼文化施設としての歴史的集積と周辺の飲食・観光施設密度から、知性力と青春力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["scholar", "native", "enthusiast"],
    luckyPoints: [
      "山笠を担いだ者の覚悟で、今日の一歩を踏み出せ。",
      "博多の神様が言っている。「その願い、受け取った」。",
      "千年続く祭りの街の子である。何を恐れることがある。",
      "流れを止めるな。山笠は前にしか進まない。",
      "今日のあなたには、お汐井の清めが宿っている。",
    ],
  },
  {
    id: "tochoji",
    tier: 2,
    ssr: true,
    name: "トウチョウガ",
    habitat: "東長寺",
    classification: "聖域型静観種",
    attribute: "沈思属性",
    catchCopy: "五重塔の影が動く速さで、焦りを手放せる。",
    ecology:
      "日本最大級の木造坐像が放つ静寂の磁場に守られ、訪れた個体の思考速度を自然に落とす作用を持つ種。癒しと知性が重なる珍しい生態。",
    researchNote: {
      classification: "静寂浸透型癒し種",
      observations: [
        "境内に入った瞬間から個体の移動速度が明らかに低下する現象が繰り返し観察されている",
        "博多旧市街の喧騒エリアから徒歩数分という立地にもかかわらず、別次元の静けさを保っている",
        "冬季の早朝に単独訪問する個体が増加し、季節と時間帯に特定のパターンがある",
      ],
    },
    parameters: { seishun: 45, iyashi: 82, kodo: 31, chisei: 72, wakuwaku: 30, yorimichi: 35 },
    dataFlavor:
      "歴史的寺院建築の密集度と周辺観光施設との補完関係から、癒し力と知性力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["healer", "scholar", "native"],
    luckyPoints: [
      "大仏の静けさを少し借りていけ。必ず返さなくていい。",
      "東長寺の時間は、ゆっくり流れる。今日くらい倣っていい。",
      "五重塔が見ている。あなたは今日も、正しく立っている。",
      "焦らなくていい。千年前もこの場所は静かだった。",
      "木造の大仏が伝えている。「重さは、下に置いていきな」。",
    ],
  },
  {
    id: "hakozaki-shrine",
    tier: 2,
    ssr: true,
    name: "ハコザキオン",
    habitat: "筥崎宮",
    classification: "聖域型守護種",
    attribute: "勝運属性",
    catchCopy: "筥崎宮の風に背中を押された者は、みんな前に進んだ。",
    ecology:
      "蒙古来襲を退けた歴史的記憶を青春力に変換し続ける種。勝利と豊穣の気配を常に帯び、訪れた個体のエネルギーを底上げする特性がある。",
    researchNote: {
      classification: "勝運付与型青春種",
      observations: [
        "博多湾に近い立地から、海風とともに広いテリトリーにエネルギーを放出している",
        "放生会の時期に個体密度が年間最大に達し、エネルギー放出量も同期して最大化する",
        "受験・就職・試合前の個体が特定の参拝ルートを辿る行動パターンが記録されている",
      ],
    },
    parameters: { seishun: 98, iyashi: 90, kodo: 33, chisei: 75, wakuwaku: 30, yorimichi: 43 },
    dataFlavor:
      "祭礼規模と海岸線への近接度、若年参拝者の流入データから、青春力と癒し力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["native", "healer", "scholar"],
    luckyPoints: [
      "敵国降伏の神様が言う。「君の壁も、必ず崩れる」。",
      "今日の筥崎の風は追い風だ。そのまま走れ。",
      "放生会の縁起物と同じ気配が、今日のあなたに宿っている。",
      "一の鳥居をくぐった者の足は、前に向く。",
      "八幡大神が見届けている。全力でいけ、必ず返ってくる。",
    ],
  },
  {
    id: "sumiyoshi-shrine",
    tier: 2,
    ssr: true,
    name: "スミヨシヌス",
    habitat: "住吉神社",
    classification: "聖域型守護種",
    attribute: "縁結属性",
    catchCopy: "博多の人が何百年も頼り続けた神様が、ここにいる。",
    ecology:
      "博多旧市街の最古の守護神として市民生活に深く根ざし、知性と縁の力を静かに配分し続ける種。都市の最中にありながら完全な結界を保つ。",
    researchNote: {
      classification: "都市結界型知性種",
      observations: [
        "博多旧市街の中心部という立地にありながら、外部の喧騒を遮断した静域を維持している",
        "地元民と観光個体の比率が他の神社と比べて地元側に大きく偏っている",
        "冬至・夏至・節分の時期に特定の参拝ルートを辿る個体が集中して観察される",
      ],
    },
    parameters: { seishun: 82, iyashi: 55, kodo: 33, chisei: 98, wakuwaku: 33, yorimichi: 60 },
    dataFlavor:
      "市内最古の鎮守としての歴史的密度と周辺生活圏との一体化から、知性力と青春力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["scholar", "native", "wanderer"],
    luckyPoints: [
      "住吉の神様が繋いだ縁は、簡単に切れない。",
      "博多最古の守護に見守られている。それだけで今日は十分だ。",
      "縁というのは求めるより気づくものだ。今日も開いておけ。",
      "住吉の参道を歩いた足は、良い方向に向く。",
      "静かな場所にいる神様ほど、よく聞いている。",
    ],
  },
  {
    id: "kego-shrine",
    tier: 2,
    ssr: true,
    name: "ケゴリオン",
    habitat: "警固神社",
    classification: "聖域型巡回種",
    attribute: "都心守護属性",
    catchCopy: "天神のど真ん中で、この神様は千年動いていない。",
    ecology:
      "福岡最大の繁華街の核心部に生息しながら、都市の速度に飲まれることなく独自のペースを保つ希少種。行動力とワクワク力を周囲から吸収して放出する循環型の生態。",
    researchNote: {
      classification: "都心結節型行動種",
      observations: [
        "天神の商業集積エリアの真中に位置し、通勤・買い物・参拝の動線が全て交差する地点にいる",
        "初詣時期に周辺の混雑を吸収しながら秩序を保つ、独特の整流機能が観察されている",
        "深夜でも参拝個体が途切れない、24時間稼働型の生息地となっている",
      ],
    },
    parameters: { seishun: 63, iyashi: 36, kodo: 91, chisei: 30, wakuwaku: 75, yorimichi: 60 },
    dataFlavor:
      "天神繁華街中心部という立地と周辺飲食・商業施設の密集度から、行動力とワクワク力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["explorer", "enthusiast", "native"],
    luckyPoints: [
      "天神の神様が今日も見ている。堂々とやれ。",
      "都心の神社で願ったことは、都会の速度で叶う。",
      "ケゴリオンが言う。「迷ったら、とにかく動け」。",
      "繁華街の喧騒の中でも揺れない神様がいる。あなたも同じだ。",
      "警固の地に根を張る神様が、今日の行動に力を貸す。",
    ],
  },
  {
    id: "atago-shrine",
    tier: 2,
    ssr: true,
    name: "アタゴラス",
    habitat: "愛宕神社",
    classification: "聖域型高見種",
    attribute: "高覧属性",
    catchCopy: "福岡の全景が見える丘から、神様も街が好きなのだとわかる。",
    ecology:
      "標高68メートルの丘陵に鎮座し、市街地・海・島を同時に見渡す高覧能力を持つ種。データが薄い場所に生息するにもかかわらず、市民の帰属意識に深く刻まれている。",
    researchNote: {
      classification: "高地鎮守型癒し種",
      observations: [
        "愛宕山頂から望む福岡市街地の夜景は、市内で最も感傷的な観察地点の一つとなっている",
        "参拝後に山頂で長時間滞在する個体が多く、眺望そのものが目的化している",
        "初詣・どんど焼きの時期に麓から山頂まで連続した個体の列が形成される年間行事がある",
      ],
    },
    parameters: { seishun: 37, iyashi: 98, kodo: 49, chisei: 90, wakuwaku: 30, yorimichi: 35 },
    dataFlavor:
      "市街地眺望という地理的優位性と歴史的火防の神としての認知度から、癒し力と知性力が高く判定された",
    dataSources: landmarkDataSources,
    compatibility: ["healer", "scholar", "native"],
    luckyPoints: [
      "山頂から見える福岡の灯りを覚えておけ。あれが帰る場所だ。",
      "愛宕の神様が高いところから確認した。あなたは大丈夫だ。",
      "火を鎮める神様が言う。「その焦りを、ここに置いていけ」。",
      "眺めの良い場所に立てた日は、何かが変わる始まりだ。",
      "愛宕山から見える空の広さが、今日の器だ。",
    ],
  },
];

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find((m) => m.id === id);
}
