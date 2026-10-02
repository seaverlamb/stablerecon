import {
  LedgerTransaction,
  StablecoinTransaction,
} from "@/types/transactions";

export function normalizeAmount(value: string): number {
  const cleaned = value
    .replace(/\$/g, "")
    .replace(/,/g, "")
    .trim();

  const amount = Number(cleaned);

  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid amount: ${value}`);
  }

  return amount;
}

export function normalizeReference(value: string): string {
  const reference = value.trim().toUpperCase();

  if (!reference) {
    throw new Error("Reference is required.");
  }

  return reference;
}

export function normalizeDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return date.toISOString().slice(0, 10);
}

export function normalizeNetwork(value: string): string {
  const network = value.trim().toUpperCase();

  const mappings: Record<string, string> = {
    ETH: "ETHEREUM",
    ETHEREUM: "ETHEREUM",
    BASE: "BASE",
    SOL: "SOLANA",
    SOLANA: "SOLANA",
  };

  return mappings[network] ?? network;
}

export function normalizeLedgerRow(
  row: Record<string, string>
): LedgerTransaction {
  return {
    transactionId: row.transaction_id.trim(),
    customer: row.customer.trim(),
    amount: normalizeAmount(row.amount),
    currency: row.currency.trim().toUpperCase(),
    date: normalizeDate(row.date),
    reference: normalizeReference(row.reference),
  };
}

export function normalizeStablecoinRow(
  row: Record<string, string>
): StablecoinTransaction {
  return {
    txHash: row.tx_hash.trim(),
    wallet: row.wallet.trim(),
    amount: normalizeAmount(row.amount),
    asset: row.asset.trim().toUpperCase(),
    network: normalizeNetwork(row.network),
    date: normalizeDate(row.date),
    reference: normalizeReference(row.reference),
  };
}
