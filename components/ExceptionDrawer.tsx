"use client";

import { useEffect, useState } from "react";

import { ReconciliationResult } from "@/types/transactions";
import { AIExplanation } from "@/types/ai";

type Props = {
  result: ReconciliationResult | null;
  onClose: () => void;
  onResolve: (
    resultId: string,
    note: string
  ) => void;
};

function formatMoney(
  amount: number | undefined,
  currency = "USD"
) {
  if (amount === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    matched: "Matched",
    amount_mismatch: "Amount mismatch",
    missing_ledger: "Missing ledger",
    missing_stablecoin: "Missing stablecoin",
    duplicate: "Duplicate",
  };

  return labels[status] ?? status;
}

export default function ExceptionDrawer({
  result,
  onClose,
  onResolve,
}: Props) {
  const [analysis, setAnalysis] =
    useState<AIExplanation | null>(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysisError, setAnalysisError] =
    useState<string | null>(null);

  const [
    resolutionNote,
    setResolutionNote,
  ] = useState("");

  useEffect(() => {
    setAnalysis(null);
    setAnalysisError(null);
    setIsAnalyzing(false);

    setResolutionNote(
      result?.resolutionNote ?? ""
    );
  }, [
    result?.id,
    result?.resolutionNote,
  ]);

  if (!result) {
    return null;
  }

  const currentResult = result;

  async function handleExplain() {
    try {
      setIsAnalyzing(true);
      setAnalysisError(null);
      setAnalysis(null);

      const response = await fetch(
        "/api/explain",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status:
              currentResult.status,

            reference:
              currentResult.reference,

            difference:
              currentResult.difference,

            ledger:
              currentResult.ledgerTransaction
                ? {
                    customer:
                      currentResult
                        .ledgerTransaction
                        .customer,

                    amount:
                      currentResult
                        .ledgerTransaction
                        .amount,

                    currency:
                      currentResult
                        .ledgerTransaction
                        .currency,

                    date:
                      currentResult
                        .ledgerTransaction
                        .date,
                  }
                : null,

            stablecoin:
              currentResult.stablecoinTransaction
                ? {
                    amount:
                      currentResult
                        .stablecoinTransaction
                        .amount,

                    asset:
                      currentResult
                        .stablecoinTransaction
                        .asset,

                    network:
                      currentResult
                        .stablecoinTransaction
                        .network,

                    date:
                      currentResult
                        .stablecoinTransaction
                        .date,

                    txHash:
                      currentResult
                        .stablecoinTransaction
                        .txHash,
                  }
                : null,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "AI explanation request failed."
        );
      }

      setAnalysis(
        data as AIExplanation
      );
    } catch (error) {
      setAnalysisError(
        error instanceof Error
          ? error.message
          : "AI explanation failed."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleResolveException() {
    const note =
      resolutionNote.trim();

    if (!note) {
      return;
    }

    onResolve(
      currentResult.id,
      note
    );
  }

  const isResolved =
    currentResult.resolutionStatus ===
    "resolved";

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        aria-label="Close exception drawer"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <aside className="relative ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Exception
            </p>

            <h2 className="text-2xl font-semibold">
              {currentResult.reference}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            Close
          </button>
        </div>

        <section className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Exception type
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {statusLabel(
                  currentResult.status
                )}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Resolution status
              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isResolved
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {isResolved
                  ? "Resolved"
                  : "Open"}
              </span>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6">
          <section className="rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold">
              Internal Ledger
            </h3>

            {currentResult.ledgerTransaction ? (
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">
                    Transaction ID
                  </dt>

                  <dd className="font-medium">
                    {
                      currentResult
                        .ledgerTransaction
                        .transactionId
                    }
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">
                    Customer
                  </dt>

                  <dd className="font-medium">
                    {
                      currentResult
                        .ledgerTransaction
                        .customer
                    }
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">
                    Amount
                  </dt>

                  <dd className="font-medium">
                    {formatMoney(
                      currentResult
                        .ledgerTransaction
                        .amount,
                      currentResult
                        .ledgerTransaction
                        .currency
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">
                    Date
                  </dt>

                  <dd className="font-medium">
                    {
                      currentResult
                        .ledgerTransaction
                        .date
                    }
                  </dd>
                </div>

                <div className="col-span-2">
                  <dt className="text-gray-500">
                    Reference
                  </dt>

                  <dd className="font-medium">
                    {
                      currentResult
                        .ledgerTransaction
                        .reference
                    }
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No corresponding ledger
                transaction found.
              </p>
            )}
          </section>

          <section className="rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold">
              Stablecoin Transaction
            </h3>

            {currentResult.stablecoinTransaction ? (
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">
                    Amount
                  </dt>

                  <dd className="font-medium">
                    {formatMoney(
                      currentResult
                        .stablecoinTransaction
                        .amount
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">
                    Asset
                  </dt>

                  <dd className="font-medium">
                    {
                      currentResult
                        .stablecoinTransaction
                        .asset
                    }
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">
                    Network
                  </dt>

                  <dd className="font-medium">
                    {
                      currentResult
                        .stablecoinTransaction
                        .network
                    }
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500">
                    Date
                  </dt>

                  <dd className="font-medium">
                    {
                      currentResult
                        .stablecoinTransaction
                        .date
                    }
                  </dd>
                </div>

                <div className="col-span-2">
                  <dt className="text-gray-500">
                    Wallet
                  </dt>

                  <dd className="break-all font-medium">
                    {
                      currentResult
                        .stablecoinTransaction
                        .wallet
                    }
                  </dd>
                </div>

                <div className="col-span-2">
                  <dt className="text-gray-500">
                    Transaction Hash
                  </dt>

                  <dd className="break-all font-medium">
                    {
                      currentResult
                        .stablecoinTransaction
                        .txHash
                    }
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No corresponding stablecoin
                transaction found.
              </p>
            )}
          </section>

          <section className="rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold">
              Difference
            </h3>

            <p className="mt-3 text-2xl font-semibold">
              {currentResult.difference ===
              undefined
                ? "—"
                : formatMoney(
                    currentResult.difference
                  )}
            </p>
          </section>

          <section className="rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">
                AI Analysis
              </h3>

              <button
                type="button"
                onClick={handleExplain}
                disabled={isAnalyzing}
                className="rounded bg-black px-3 py-2 text-sm text-white disabled:opacity-50"
              >
                {isAnalyzing
                  ? "Analyzing..."
                  : "Explain exception"}
              </button>
            </div>

            {analysisError && (
              <p className="mt-4 text-sm text-red-600">
                {analysisError}
              </p>
            )}

            {analysis && (
              <div className="mt-5 space-y-5 text-sm">
                <div>
                  <p className="font-medium">
                    Summary
                  </p>

                  <p className="mt-1 text-gray-700">
                    {analysis.summary}
                  </p>
                </div>

                <div>
                  <p className="font-medium">
                    Possible causes
                  </p>

                  <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                    {analysis.possibleCauses.map(
                      (cause) => (
                        <li key={cause}>
                          {cause}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <p className="font-medium">
                    Recommended next step
                  </p>

                  <p className="mt-1 text-gray-700">
                    {
                      analysis.recommendedNextStep
                    }
                  </p>
                </div>

                <div>
                  <p className="font-medium">
                    Confidence
                  </p>

                  <p className="mt-1 capitalize text-gray-700">
                    {
                      analysis.confidence
                    }
                  </p>
                </div>

                <p className="text-xs text-gray-500">
                  AI-generated investigation
                  guidance. Review before
                  taking action.
                </p>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">
                Resolution
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isResolved
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {isResolved
                  ? "Resolved"
                  : "Open"}
              </span>
            </div>

            {isResolved ? (
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="font-medium">
                    Resolution note
                  </p>

                  <p className="mt-1 whitespace-pre-wrap text-gray-700">
                    {
                      currentResult.resolutionNote
                    }
                  </p>
                </div>

                <div>
                  <p className="font-medium">
                    Resolved at
                  </p>

                  <p className="mt-1 text-gray-700">
                    {currentResult.resolvedAt
                      ? new Date(
                          currentResult.resolvedAt
                        ).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <label
                  htmlFor="resolution-note"
                  className="text-sm font-medium"
                >
                  Analyst note
                </label>

                <textarea
                  id="resolution-note"
                  value={
                    resolutionNote
                  }
                  onChange={(event) =>
                    setResolutionNote(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Describe what you found and how this exception was resolved."
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-gray-500"
                />

                <button
                  type="button"
                  onClick={
                    handleResolveException
                  }
                  disabled={
                    !resolutionNote.trim()
                  }
                  className="mt-4 w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Resolve exception
                </button>

                <p className="mt-2 text-xs text-gray-500">
                  Resolution requires an
                  analyst note.
                </p>
              </div>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}