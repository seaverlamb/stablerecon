import { ReconciliationResult } from "@/types/transactions";

export function buildSummary(
  results: ReconciliationResult[]
) {
  const matched = results.filter(
    (result) => result.status === "matched"
  ).length;

  const exceptions = results.length - matched;

  return {
    total: results.length,
    matched,
    exceptions,

    matchRate:
      results.length === 0
        ? 0
        : (matched / results.length) * 100,

    amountMismatch: results.filter(
      (result) => result.status === "amount_mismatch"
    ).length,

    missingLedger: results.filter(
      (result) => result.status === "missing_ledger"
    ).length,

    missingStablecoin: results.filter(
      (result) => result.status === "missing_stablecoin"
    ).length,

    duplicate: results.filter(
      (result) => result.status === "duplicate"
    ).length,
  };
}