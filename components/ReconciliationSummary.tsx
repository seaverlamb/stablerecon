import { ReconciliationResult } from "@/types/transactions";
import { buildSummary } from "@/lib/reconciliation/summary";

type Props = {
  results: ReconciliationResult[];
};

export default function ReconciliationSummary({
  results,
}: Props) {
  const summary = buildSummary(results);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        Reconciliation Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          label="References analyzed"
          value={summary.total}
        />

        <SummaryCard
          label="Matched"
          value={summary.matched}
        />

        <SummaryCard
          label="Exceptions"
          value={summary.exceptions}
        />

        <SummaryCard
          label="Match rate"
          value={`${summary.matchRate.toFixed(0)}%`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <SummaryCard
          label="Amount mismatch"
          value={summary.amountMismatch}
        />

        <SummaryCard
          label="Missing ledger"
          value={summary.missingLedger}
        />

        <SummaryCard
          label="Missing stablecoin"
          value={summary.missingStablecoin}
        />

        <SummaryCard
          label="Duplicates"
          value={summary.duplicate}
        />
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-semibold">
        {value}
      </div>
    </div>
  );
}