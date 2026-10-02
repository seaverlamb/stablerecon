export type AIExplanation = {
  summary: string;
  possibleCauses: string[];
  recommendedNextStep: string;
  confidence: "low" | "medium" | "high";
};