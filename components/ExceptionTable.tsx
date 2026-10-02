"use client";

import {
  useMemo,
  useState,
} from "react";

import { ReconciliationResult } from "@/types/transactions";

type Props = {
  results: ReconciliationResult[];
  onSelect: (
    result: ReconciliationResult
  ) => void;
};

type ResolutionFilter =
  | "all"
  | "open"
  | "resolved";

type ExceptionTypeFilter =
  | "all"
  | "amount_mismatch"
  | "missing_ledger"
  | "missing_stablecoin"
  | "duplicate";

const STATUS_LABELS: Record<
  string,
  string
> = {
  matched: "Matched",
  amount_mismatch:
    "Amount mismatch",
  missing_ledger:
    "Missing ledger",
  missing_stablecoin:
    "Missing stablecoin",
  duplicate: "Duplicate",
};

function formatMoney(
  amount: number | undefined,
  currency = "USD"
) {
  if (amount === undefined) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency,
    }
  ).format(amount);
}

export default function ExceptionTable({
  results,
  onSelect,
}: Props) {
  const [
    resolutionFilter,
    setResolutionFilter,
  ] =
    useState<ResolutionFilter>(
      "all"
    );

  const [
    exceptionTypeFilter,
    setExceptionTypeFilter,
  ] =
    useState<ExceptionTypeFilter>(
      "all"
    );

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const exceptions =
    useMemo(
      () =>
        results.filter(
          (result) =>
            result.status !==
            "matched"
        ),
      [results]
    );

  const filteredExceptions =
    useMemo(() => {
      const normalizedSearch =
        searchQuery
          .trim()
          .toLowerCase();

      return exceptions.filter(
        (result) => {
          const isResolved =
            result
              .resolutionStatus ===
            "resolved";

          const matchesResolution =
            resolutionFilter ===
              "all" ||
            (resolutionFilter ===
              "open" &&
              !isResolved) ||
            (resolutionFilter ===
              "resolved" &&
              isResolved);

          const matchesType =
            exceptionTypeFilter ===
              "all" ||
            result.status ===
              exceptionTypeFilter;

          const searchableValues = [
            result.reference,
            result
              .ledgerTransaction
              ?.customer,
            result
              .ledgerTransaction
              ?.transactionId,
            result
              .stablecoinTransaction
              ?.wallet,
            result
              .stablecoinTransaction
              ?.txHash,
            result
              .stablecoinTransaction
              ?.asset,
            result
              .stablecoinTransaction
              ?.network,
          ];

          const matchesSearch =
            normalizedSearch === "" ||
            searchableValues.some(
              (value) =>
                value
                  ?.toLowerCase()
                  .includes(
                    normalizedSearch
                  )
            );

          return (
            matchesResolution &&
            matchesType &&
            matchesSearch
          );
        }
      );
    }, [
      exceptions,
      resolutionFilter,
      exceptionTypeFilter,
      searchQuery,
    ]);

  const openCount =
    exceptions.filter(
      (result) =>
        result
          .resolutionStatus !==
        "resolved"
    ).length;

  const resolvedCount =
    exceptions.length -
    openCount;

  function clearFilters() {
    setResolutionFilter("all");
    setExceptionTypeFilter(
      "all"
    );
    setSearchQuery("");
  }

  const hasActiveFilters =
    resolutionFilter !== "all" ||
    exceptionTypeFilter !==
      "all" ||
    searchQuery.trim() !== "";

  if (
    exceptions.length === 0
  ) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Exceptions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {openCount} open ·{" "}
              {resolvedCount} resolved
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={
                clearFilters
              }
              className="self-start text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-black active:scale-[0.98] sm:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <div>
            <label
              htmlFor="exception-search"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Search
            </label>

            <input
              id="exception-search"
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder="Reference, customer, transaction ID, wallet, or tx hash"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-150 placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="resolution-filter"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Resolution
            </label>

            <select
              id="resolution-filter"
              value={
                resolutionFilter
              }
              onChange={(event) =>
                setResolutionFilter(
                  event.target
                    .value as ResolutionFilter
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-150 focus:border-gray-500 focus:ring-2 focus:ring-gray-100 lg:w-auto"
            >
              <option value="all">
                All
              </option>
              <option value="open">
                Open
              </option>
              <option value="resolved">
                Resolved
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="exception-type-filter"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Exception type
            </label>

            <select
              id="exception-type-filter"
              value={
                exceptionTypeFilter
              }
              onChange={(event) =>
                setExceptionTypeFilter(
                  event.target
                    .value as ExceptionTypeFilter
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-150 focus:border-gray-500 focus:ring-2 focus:ring-gray-100 lg:w-auto"
            >
              <option value="all">
                All types
              </option>
              <option value="amount_mismatch">
                Amount mismatch
              </option>
              <option value="missing_ledger">
                Missing ledger
              </option>
              <option value="missing_stablecoin">
                Missing stablecoin
              </option>
              <option value="duplicate">
                Duplicate
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-700">
          {
            filteredExceptions.length
          }
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-700">
          {exceptions.length}
        </span>{" "}
        exceptions
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        {filteredExceptions.length ===
        0 ? (
          <div className="ui-fade-in p-8 text-center">
            <p className="font-medium text-gray-900">
              No exceptions match
              your search or filters.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try another search
              term or clear the
              filters.
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-gray-50 active:scale-[0.98]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    Reference
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    Ledger
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    Stablecoin
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    Difference
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Exception type
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Resolution
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredExceptions.map(
                  (
                    result,
                    index
                  ) => {
                    const isResolved =
                      result
                        .resolutionStatus ===
                      "resolved";

                    return (
                      <tr
                        key={`${result.id}-${resolutionFilter}-${exceptionTypeFilter}-${searchQuery}`}
                        onClick={() =>
                          onSelect(
                            result
                          )
                        }
                        style={{
                          animationDelay: `${Math.min(
                            index * 30,
                            150
                          )}ms`,
                        }}
                        className="ui-fade-up cursor-pointer border-t border-gray-100 transition-colors duration-150 hover:bg-gray-50 active:bg-gray-100"
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {
                            result.reference
                          }
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {result
                            .ledgerTransaction
                            ?.customer ??
                            "—"}
                        </td>

                        <td className="px-4 py-3 text-right text-gray-700">
                          {result
                            .ledgerTransaction
                            ? formatMoney(
                                result
                                  .ledgerTransaction
                                  .amount,
                                result
                                  .ledgerTransaction
                                  .currency
                              )
                            : "—"}
                        </td>

                        <td className="px-4 py-3 text-right text-gray-700">
                          {result
                            .stablecoinTransaction
                            ? formatMoney(
                                result
                                  .stablecoinTransaction
                                  .amount
                              )
                            : "—"}
                        </td>

                        <td className="px-4 py-3 text-right text-gray-700">
                          {result.difference !==
                          undefined
                            ? formatMoney(
                                result.difference
                              )
                            : "—"}
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {STATUS_LABELS[
                            result.status
                          ] ??
                            result.status}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                              isResolved
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {isResolved
                              ? "Resolved"
                              : "Open"}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}