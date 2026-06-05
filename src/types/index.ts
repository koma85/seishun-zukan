export type DiagnosisTypeId =
  | "native"
  | "healer"
  | "explorer"
  | "scholar"
  | "enthusiast"
  | "wanderer";

export interface Parameters {
  seishun: number;
  iyashi: number;
  kodo: number;
  chisei: number;
  wakuwaku: number;
  yorimichi: number;
}

export interface ResearchNote {
  classification: string;
  observations: string[];
}

export interface Monster {
  id: string;
  tier: 1 | 2;
  ssr: boolean;
  name: string;
  habitat: string;
  classification: string;
  attribute: string;
  catchCopy: string;
  ecology: string;
  researchNote: ResearchNote;
  parameters: Parameters;
  dataFlavor: string;
  scoringEvidence: string[];
  dataSources: string[];
  compatibility: DiagnosisTypeId[];
  luckyPoints?: string[];
}

export interface DiagnosisQuestion {
  id: number;
  question: string;
  options: DiagnosisOption[];
}

export interface DiagnosisOption {
  label: string;
  scores: Partial<Parameters>;
}

export interface DiagnosisType {
  id: DiagnosisTypeId;
  dominantParam: keyof Parameters;
  label: string;
  description: string;
  compatibleMonsters: string[];
}

export interface DiagnosisResult {
  typeId: DiagnosisTypeId;
  scores: Parameters;
  timestamp: number;
}

export interface ZukanState {
  discoveredIds: string[];
  diagnosisResult: DiagnosisResult | null;
}
