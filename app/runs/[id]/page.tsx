"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import { ReconciliationResult } from "@/types/transactions";

import ReconciliationSummary from "@/components/ReconciliationSummary";
import ExceptionTable from "@/components/ExceptionTable";
import ExceptionDrawer from "@/components/ExceptionDrawer";
import LoadingSkeleton from "@/components/LoadingSkeleton";

type Run = {
  id: string;
  createdAt: string;
  ledgerFileName:
    | string
    | null;
  stablecoinFileName:
    | string
    | null;
};

export default function RunDetailPage() {
  const params = useParams();

  const runId =
    params.id as string;

  const [run, setRun] =
    useState<Run | null>(null);

  const [
    results,
    setResults,
  ] = useState<
    ReconciliationResult[]
  >([]);

  const [
    selectedException,
    setSelectedException,
  ] =
    useState<ReconciliationResult | null>(
      null
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function loadRun() {
      try {
        setIsLoading(true);

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

        setRun(data.run);

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
        setIsLoading(false);
      }
    }

    if (runId) {
      loadRun();
    }
  }, [runId]);

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

  if (isLoading) {
    return (
      <main className="min-h-screen px-8 py-10">
        <div className="mx-auto max-w-6xl">
          <LoadingSkeleton />
        </div>
      </main>
    );
  }

  if (error && !run) {
    return (
      <main className="min-h-screen px-8 py-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/runs"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            ← Back to runs
          </Link>

          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="ui-fade-up">
          <Link
            href="/runs"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
          >
            ← Back to runs
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Reconciliation run
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                {run
                  ? new Date(
                      run.createdAt
                    ).toLocaleString()
                  : "Run"}
              </h1>

              {run && (
                <p className="mt-2 text-gray-600">
                  {run.ledgerFileName ??
                    "Ledger"}{" "}
                  ↔{" "}
                  {run.stablecoinFileName ??
                    "Stablecoin"}
                </p>
              )}
            </div>

            <Link
              href="/reconcile"
              className="self-start rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-all duration-150 hover:bg-gray-800 active:scale-[0.98]"
            >
              New reconciliation
            </Link>
          </div>
        </div>

        {error && (
          <div className="ui-fade-in mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {results.length > 0 ? (
          <div className="ui-fade-up">
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
        ) : (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-sm text-gray-500">
            This run contains no
            reconciliation results.
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