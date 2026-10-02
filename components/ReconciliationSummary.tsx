"use client";

import {
  useEffect,
  useState,
} from "react";

import { ReconciliationResult } from "@/types/transactions";
import { buildSummary } from "@/lib/reconciliation/summary";

type Props = {
  results: ReconciliationResult[];
};

type AnimatedNumberProps = {
  value: number;
  suffix?: string;
};

function AnimatedNumber({
  value,
  suffix = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] =
    useState(0);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) {
      setDisplayValue(
        Math.round(value)
      );
      return;
    }

    const duration = 450;
    const start =
      performance.now();

    let frame = 0;

    function update(
      currentTime: number
    ) {
      const elapsed =
        currentTime - start;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      setDisplayValue(
        Math.round(
          value * eased
        )
      );

      if (progress < 1) {
        frame =
          requestAnimationFrame(
            update
          );
      }
    }

    frame =
      requestAnimationFrame(
        update
      );

    return () =>
      cancelAnimationFrame(
        frame
      );
  }, [value]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export default function ReconciliationSummary({
  results,
}: Props) {
  const summary =
    buildSummary(results);

  const cards = [
    {
      label:
        "References analyzed",
      value: summary.total,
    },
    {
      label: "Matched",
      value: summary.matched,
    },
    {
      label: "Exceptions",
      value:
        summary.exceptions,
    },
    {
      label: "Match rate",
      value:
        summary.matchRate,
      suffix: "%",
    },
    {
      label:
        "Amount mismatch",
      value:
        summary.amountMismatch,
    },
    {
      label:
        "Missing ledger",
      value:
        summary.missingLedger,
    },
    {
      label:
        "Missing stablecoin",
      value:
        summary.missingStablecoin,
    },
    {
      label: "Duplicates",
      value:
        summary.duplicate,
    },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">
        Reconciliation Summary
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(
          (
            card,
            index
          ) => (
            <div
              key={
                card.label
              }
              style={{
                animationDelay: `${index * 35}ms`,
              }}
              className="ui-fade-up rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm text-gray-500">
                {card.label}
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                <AnimatedNumber
                  value={
                    card.value
                  }
                  suffix={
                    card.suffix
                  }
                />
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}