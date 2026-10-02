import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const {
      data: run,
      error: runError,
    } = await supabaseAdmin
      .from("reconciliation_runs")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (runError) {
      throw runError;
    }

    if (!run) {
      return Response.json({
        run: null,
        results: [],
      });
    }

    const {
      data: databaseResults,
      error: resultsError,
    } = await supabaseAdmin
      .from(
        "reconciliation_results"
      )
      .select("*")
      .eq("run_id", run.id)
      .order("created_at", {
        ascending: true,
      });

    if (resultsError) {
      throw resultsError;
    }

    const results =
      databaseResults.map(
        (result) => ({
          id: result.id,

          reference:
            result.reference,

          status:
            result.status,

          ledgerTransaction:
            result.ledger_transaction ??
            undefined,

          stablecoinTransaction:
            result.stablecoin_transaction ??
            undefined,

          difference:
            result.difference === null
              ? undefined
              : Number(
                  result.difference
                ),

          resolutionStatus:
            result.resolution_status ??
            undefined,

          resolutionNote:
            result.resolution_note ??
            undefined,

          resolvedAt:
            result.resolved_at ??
            undefined,
        })
      );

    return Response.json({
      run: {
        id: run.id,

        createdAt:
          run.created_at,

        ledgerFileName:
          run.ledger_file_name,

        stablecoinFileName:
          run.stablecoin_file_name,
      },

      results,
    });
  } catch (error) {
    console.error(
      "Load latest run error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load the latest reconciliation run.";

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