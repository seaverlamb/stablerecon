"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { parseCsv } from "@/lib/csv/parseCsv";

import {
  normalizeLedgerRow,
  normalizeStablecoinRow,
} from "@/lib/normalization/normalize";

import { reconcile } from "@/lib/reconciliation/reconcile";

import { ReconciliationResult } from "@/types/transactions";

import ReconciliationSummary from "@/components/ReconciliationSummary";
import ExceptionTable from "@/components/ExceptionTable";
import ExceptionDrawer from "@/components/ExceptionDrawer";
import RunHistory, {
  RunSummary,
} from "@/components/RunHistory";
import LoadingSkeleton from "@/components/LoadingSkeleton";

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

export default function Home() {
  const [
    ledgerFile,
    setLedgerFile,
  ] = useState<File | null>(null);

  const [
    stablecoinFile,
    setStablecoinFile,
  ] = useState<File | null>(null);

  const [
    results,
    setResults,
  ] = useState<
    ReconciliationResult[]
  >([]);

  const [
    runHistory,
    setRunHistory,
  ] = useState<RunSummary[]>([]);

  const [
    activeRunId,
    setActiveRunId,
  ] = useState<string | null>(
    null
  );

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  const [
    isReconciling,
    setIsReconciling,
  ] = useState(false);

  const [
    isLoadingSavedRun,
    setIsLoadingSavedRun,
  ] = useState(true);

  const [
    isLoadingRun,
    setIsLoadingRun,
  ] = useState(false);

  const [
    selectedException,
    setSelectedException,
  ] =
    useState<ReconciliationResult | null>(
      null
    );

  const loadHistory =
    useCallback(async () => {
      try {
        const response =
          await fetch(
            "/api/runs/history"
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to load run history."
          );
        }

        setRunHistory(
          Array.isArray(data.runs)
            ? data.runs
            : []
        );
      } catch (error) {
        console.error(
          "Load history error:",
          error
        );
      }
    }, []);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const response =
          await fetch(
            "/api/runs/latest"
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to load saved reconciliation."
          );
        }

        if (
          data.run &&
          Array.isArray(
            data.results
          )
        ) {
          setActiveRunId(
            data.run.id
          );

          setResults(
            data.results
          );
        }

        await loadHistory();
      } catch (error) {
        console.error(
          "Load saved run error:",
          error
        );
      } finally {
        setIsLoadingSavedRun(
          false
        );
      }
    }

    loadInitialData();
  }, [loadHistory]);

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
      setSelectedException(
        null
      );

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

      const reconciliationResults =
        reconcile(
          normalizedLedger,
          normalizedStablecoin
        ).map((result) => ({
          ...result,

          resolutionStatus:
            result.status ===
            "matched"
              ? undefined
              : ("open" as const),
        }));

      const saveResponse =
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

            results:
              reconciliationResults,
          }),
        });

      const saveData =
        await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(
          saveData.error ||
            "Unable to save reconciliation run."
        );
      }

      setActiveRunId(
        saveData.runId
      );

      setResults(
        reconciliationResults
      );

      await loadHistory();
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
      setIsReconciling(
        false
      );
    }
  }

  async function handleSelectRun(
    runId: string
  ) {
    if (
      runId === activeRunId
    ) {
      return;
    }

    try {
      setIsLoadingRun(true);
      setError(null);
      setSelectedException(
        null
      );

      const response =
        await fetch(
          `/api/runs/${runId}`
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load reconciliation run."
        );
      }

      setActiveRunId(runId);

      setResults(
        Array.isArray(
          data.results
        )
          ? data.results
          : []
      );
    } catch (error) {
      console.error(
        "Load run error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load reconciliation run."
      );
    } finally {
      setIsLoadingRun(false);
    }
  }

  async function handleResolve(
    resultId: string,
    note: string
  ) {
    try {
      setError(null);

      const response =
        await fetch(
          `/api/results/${resultId}/resolve`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              note,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to resolve exception."
        );
      }

      setResults(
        (currentResults) =>
          currentResults.map(
            (result) =>
              result.id ===
              resultId
                ? {
                    ...result,

                    resolutionStatus:
                      "resolved",

                    resolutionNote:
                      data.resolutionNote,

                    resolvedAt:
                      data.resolvedAt,
                  }
                : result
          )
      );

      setSelectedException(
        (current) =>
          current?.id ===
          resultId
            ? {
                ...current,

                resolutionStatus:
                  "resolved",

                resolutionNote:
                  data.resolutionNote,

                resolvedAt:
                  data.resolvedAt,
              }
            : current
      );

      await loadHistory();
    } catch (error) {
      console.error(
        "Resolve error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to resolve exception."
      );
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="ui-fade-up">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            StableRecon
          </h1>

          <p className="mt-2 text-gray-600">
            Reconcile stablecoin
            transactions against your
            internal ledger.
          </p>
        </div>

        <section className="ui-fade-up mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="ledger-file"
                className="block text-sm font-medium text-gray-700"
              >
                Internal Ledger
              </label>

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
                className="mt-2 block w-full text-sm text-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="stablecoin-file"
                className="block text-sm font-medium text-gray-700"
              >
                Stablecoin
                Transactions
              </label>

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
                className="mt-2 block w-full text-sm text-gray-700"
              />
            </div>
          </div>

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
            className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isReconciling
              ? "Reconciling..."
              : "Reconcile"}
          </button>

          {error && (
            <div className="ui-fade-in mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </section>

        <RunHistory
          runs={runHistory}
          activeRunId={
            activeRunId
          }
          onSelect={
            handleSelectRun
          }
          isLoadingRun={
            isLoadingRun
          }
        />

        {(isLoadingSavedRun ||
          isLoadingRun) && (
          <LoadingSkeleton />
        )}

        {!isLoadingSavedRun &&
          !isLoadingRun &&
          results.length > 0 && (
            <div
              key={
                activeRunId ??
                "current"
              }
              className="ui-fade-up"
            >
              <ReconciliationSummary
                results={results}
              />

              <ExceptionTable
                results={results}
                onSelect={
                  setSelectedException
                }
              />
            </div>
          )}

        <ExceptionDrawer
          result={
            selectedException
          }
          onClose={() =>
            setSelectedException(
              null
            )
          }
          onResolve={
            handleResolve
          }
        />
      </div>
    </main>
  );
}