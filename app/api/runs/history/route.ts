import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const {
      data: runs,
      error: runsError,
    } = await supabaseAdmin
      .from("reconciliation_runs")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (runsError) {
      throw runsError;
    }

    const {
      data: results,
      error: resultsError,
    } = await supabaseAdmin
      .from("reconciliation_results")
      .select(
        "run_id,status,resolution_status"
      );

    if (resultsError) {
      throw resultsError;
    }

    const history = runs.map((run) => {
      const runResults =
        results.filter(
          (result) =>
            result.run_id === run.id
        );

      const matched =
        runResults.filter(
          (result) =>
            result.status === "matched"
        ).length;

      const exceptions =
        runResults.length - matched;

      const openExceptions =
        runResults.filter(
          (result) =>
            result.status !== "matched" &&
            result.resolution_status !==
              "resolved"
        ).length;

      return {
        id: run.id,
        createdAt: run.created_at,
        ledgerFileName:
          run.ledger_file_name,
        stablecoinFileName:
          run.stablecoin_file_name,
        total: runResults.length,
        matched,
        exceptions,
        openExceptions,
      };
    });

    return Response.json({
      runs: history,
    });
  } catch (error) {
    console.error(
      "Run history error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load run history.";

    return Response.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}