export type LedgerTransaction = {
  transactionId: string;
  customer: string;
  amount: number;
  currency: string;
  date: string;
  reference: string;
};

export type StablecoinTransaction = {
  txHash: string;
  wallet: string;
  amount: number;
  asset: string;
  network: string;
  date: string;
  reference: string;
};

export type ReconciliationStatus =
  | "matched"
  | "amount_mismatch"
  | "missing_ledger"
  | "missing_stablecoin"
  | "duplicate";

export type ReconciliationResult = {
  id: string;
  reference: string;
  status: ReconciliationStatus;
  ledgerTransaction?: LedgerTransaction;
  stablecoinTransaction?: StablecoinTransaction;
  difference?: number;

  resolutionStatus?: "open" | "resolved";
  resolutionNote?: string;
  resolvedAt?: string;
};
