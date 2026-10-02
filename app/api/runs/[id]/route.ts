import { supabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    const {
      data: run,
      error: runError,
    } = await supabaseAdmin
      .from("reconciliation_runs")
      .select("*")
      .eq("id", id)
      .single();

    if (runError) {
      throw runError;
    }

    const {
      data: databaseResults,
      error: resultsError,
    } = await supabaseAdmin
      .from("reconciliation_results")
      .select("*")
      .eq("run_id", id)
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
      "Load run error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load reconciliation run.";

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