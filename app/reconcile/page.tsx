"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { parseCsv } from "@/lib/csv/parseCsv";

import {
  normalizeLedgerRow,
  normalizeStablecoinRow,
} from "@/lib/normalization/normalize";

import { reconcile } from "@/lib/reconciliation/reconcile";

const LEDGER_REQUIRED_COLUMNS = [
  "transaction_id",
  "customer",
  "amount",
  "currency",
  "date",
  "reference",
];

const STABLECOIN_REQUIRED_COLUMNS = [
  "tx_hash",
  "wallet",
  "amount",
  "asset",
  "network",
  "date",
  "reference",
];

export default function ReconcilePage() {
  const router = useRouter();

  const [ledgerFile, setLedgerFile] =
    useState<File | null>(null);

  const [
    stablecoinFile,
    setStablecoinFile,
  ] = useState<File | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [
    isReconciling,
    setIsReconciling,
  ] = useState(false);

  async function handleReconcile() {
    if (
      !ledgerFile ||
      !stablecoinFile
    ) {
      setError(
        "Please select both the internal ledger CSV and stablecoin CSV."
      );
      return;
    }

    try {
      setIsReconciling(true);
      setError(null);

      const ledgerRows =
        await parseCsv<
          Record<string, string>
        >(
          ledgerFile,
          LEDGER_REQUIRED_COLUMNS
        );

      const stablecoinRows =
        await parseCsv<
          Record<string, string>
        >(
          stablecoinFile,
          STABLECOIN_REQUIRED_COLUMNS
        );

      const normalizedLedger =
        ledgerRows.map(
          normalizeLedgerRow
        );

      const normalizedStablecoin =
        stablecoinRows.map(
          normalizeStablecoinRow
        );

      const results = reconcile(
        normalizedLedger,
        normalizedStablecoin
      ).map((result) => ({
        ...result,

        resolutionStatus:
          result.status === "matched"
            ? undefined
            : ("open" as const),
      }));

      const response =
        await fetch("/api/runs", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ledgerFileName:
              ledgerFile.name,

            stablecoinFileName:
              stablecoinFile.name,

            results,
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to save reconciliation run."
        );
      }

      router.push(
        `/runs/${data.runId}`
      );
    } catch (error) {
      console.error(
        "Reconciliation error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );
    } finally {
      setIsReconciling(false);
    }
  }

  return (
    <main className="min-h-screen px-8 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="ui-fade-up">
          <p className="text-sm font-medium text-gray-500">
            New reconciliation
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Reconcile transactions
          </h1>

          <p className="mt-2 text-gray-600">
            Upload your internal ledger and
            stablecoin settlement files.
          </p>
        </div>

        <section className="ui-fade-up mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="ledger-file"
                className="block text-sm font-semibold text-gray-900"
              >
                Internal Ledger
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Upload the ledger CSV you
                want to reconcile.
              </p>

              <input
                id="ledger-file"
                type="file"
                accept=".csv,text/csv"
                onChange={(event) =>
                  setLedgerFile(
                    event.target
                      .files?.[0] ??
                      null
                  )
                }
                className="mt-4 block w-full text-sm text-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="stablecoin-file"
                className="block text-sm font-semibold text-gray-900"
              >
                Stablecoin Transactions
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Upload the corresponding
                settlement CSV.
              </p>

              <input
                id="stablecoin-file"
                type="file"
                accept=".csv,text/csv"
                onChange={(event) =>
                  setStablecoinFile(
                    event.target
                      .files?.[0] ??
                      null
                  )
                }
                className="mt-4 block w-full text-sm text-gray-700"
              />
            </div>
          </div>

          {error && (
            <div className="ui-fade-in mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={
                handleReconcile
              }
              disabled={
                !ledgerFile ||
                !stablecoinFile ||
                isReconciling
              }
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isReconciling
                ? "Reconciling..."
                : "Run reconciliation"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}