"use client";

export type RunSummary = {
  id: string;
  createdAt: string;

  ledgerFileName:
    | string
    | null;

  stablecoinFileName:
    | string
    | null;

  total: number;
  matched: number;
  exceptions: number;
  openExceptions: number;
};

type Props = {
  runs: RunSummary[];
  activeRunId: string | null;
  onSelect: (
    runId: string
  ) => void;
  isLoadingRun: boolean;
};

export default function RunHistory({
  runs,
  activeRunId,
  onSelect,
  isLoadingRun,
}: Props) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Run History
        </h2>

        <span className="text-sm text-gray-500">
          {runs.length}{" "}
          {runs.length === 1
            ? "run"
            : "runs"}
        </span>
      </div>

      {runs.length === 0 ? (
        <div className="ui-fade-in rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
          No reconciliation runs
          yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {runs.map(
            (run, index) => {
              const isActive =
                run.id ===
                activeRunId;

              return (
                <button
                  key={run.id}
                  type="button"
                  disabled={
                    isLoadingRun
                  }
                  onClick={() =>
                    onSelect(
                      run.id
                    )
                  }
                  style={{
                    animationDelay: `${Math.min(
                      index * 40,
                      200
                    )}ms`,
                  }}
                  className={`ui-fade-up block w-full border-b border-gray-100 p-5 text-left transition-all duration-200 last:border-b-0 active:scale-[0.995] disabled:cursor-wait ${
                    isActive
                      ? "bg-gray-50 shadow-[inset_3px_0_0_0_#111827]"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {new Date(
                            run.createdAt
                          ).toLocaleString()}
                        </p>

                        {isActive && (
                          <span className="ui-scale-in rounded-full bg-black px-2 py-1 text-xs font-medium text-white">
                            Viewing
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-gray-600">
                        {run.ledgerFileName ??
                          "Ledger"}{" "}
                        ↔{" "}
                        {run.stablecoinFileName ??
                          "Stablecoin"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-5 text-sm">
                      <div>
                        <p className="text-gray-500">
                          References
                        </p>
                        <p className="font-semibold">
                          {run.total}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">
                          Exceptions
                        </p>
                        <p className="font-semibold">
                          {
                            run.exceptions
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">
                          Open
                        </p>
                        <p className="font-semibold">
                          {
                            run.openExceptions
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}