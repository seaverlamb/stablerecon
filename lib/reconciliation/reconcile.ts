import {
  LedgerTransaction,
  StablecoinTransaction,
  ReconciliationResult,
} from "@/types/transactions";

function groupByReference<T extends { reference: string }>(
  transactions: T[]
) {
  const map = new Map<string, T[]>();

  for (const transaction of transactions) {
    const existing = map.get(transaction.reference) ?? [];
    existing.push(transaction);
    map.set(transaction.reference, existing);
  }

  return map;
}

export function reconcile(
  ledger: LedgerTransaction[],
  stablecoin: StablecoinTransaction[]
): ReconciliationResult[] {
  const results: ReconciliationResult[] = [];

  const ledgerMap = groupByReference(ledger);
  const stablecoinMap = groupByReference(stablecoin);

  const references = new Set([
    ...ledgerMap.keys(),
    ...stablecoinMap.keys(),
  ]);

  for (const reference of references) {
    const ledgerItems = ledgerMap.get(reference) ?? [];
    const stablecoinItems = stablecoinMap.get(reference) ?? [];

    if (
      ledgerItems.length > 1 ||
      stablecoinItems.length > 1
    ) {
      results.push({
        id: crypto.randomUUID(),
        reference,
        status: "duplicate",
        ledgerTransaction: ledgerItems[0],
        stablecoinTransaction: stablecoinItems[0],
      });

      continue;
    }

    const ledgerTransaction = ledgerItems[0];
    const stablecoinTransaction = stablecoinItems[0];

    if (ledgerTransaction && !stablecoinTransaction) {
      results.push({
        id: crypto.randomUUID(),
        reference,
        status: "missing_stablecoin",
        ledgerTransaction,
      });

      continue;
    }

    if (!ledgerTransaction && stablecoinTransaction) {
      results.push({
        id: crypto.randomUUID(),
        reference,
        status: "missing_ledger",
        stablecoinTransaction,
      });

      continue;
    }

    if (!ledgerTransaction || !stablecoinTransaction) {
      continue;
    }

    const difference =
      stablecoinTransaction.amount -
      ledgerTransaction.amount;

    if (Math.abs(difference) < 0.000001) {
      results.push({
        id: crypto.randomUUID(),
        reference,
        status: "matched",
        ledgerTransaction,
        stablecoinTransaction,
        difference: 0,
      });
    } else {
      results.push({
        id: crypto.randomUUID(),
        reference,
        status: "amount_mismatch",
        ledgerTransaction,
        stablecoinTransaction,
        difference,
      });
    }
  }

  return results;
}
