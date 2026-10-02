"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import RunHistory, {
  RunSummary,
} from "@/components/RunHistory";

import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function RunsPage() {
  const router = useRouter();

  const [
    runs,
    setRuns,
  ] = useState<RunSummary[]>([]);

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
    async function loadRuns() {
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

        setRuns(
          Array.isArray(data.runs)
            ? data.runs
            : []
        );
      } catch (error) {
        console.error(
          "Run history error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load run history."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadRuns();
  }, []);

  return (
    <main className="min-h-screen px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="ui-fade-up">
          <p className="text-sm font-medium text-gray-500">
            Operations
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Reconciliation runs
          </h1>

          <p className="mt-2 text-gray-600">
            Review previous reconciliation
            runs and investigate their
            exceptions.
          </p>
        </div>

        {error && (
          <div className="ui-fade-in mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <RunHistory
            runs={runs}
            activeRunId={null}
            isLoadingRun={false}
            onSelect={(runId) =>
              router.push(
                `/runs/${runId}`
              )
            }
          />
        )}
      </div>
    </main>
  );
}