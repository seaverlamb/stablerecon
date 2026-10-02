import { supabaseAdmin } from "@/lib/supabase/admin";
import { ReconciliationResult } from "@/types/transactions";

type CreateRunRequest = {
  ledgerFileName: string;
  stablecoinFileName: string;
  results: ReconciliationResult[];
};

export async function POST(
  request: Request
) {
  try {
    const body: CreateRunRequest =
      await request.json();

    if (
      !body.results ||
      !Array.isArray(body.results)
    ) {
      return Response.json(
        {
          error:
            "Reconciliation results are required.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: run,
      error: runError,
    } = await supabaseAdmin
      .from("reconciliation_runs")
      .insert({
        ledger_file_name:
          body.ledgerFileName,
        stablecoin_file_name:
          body.stablecoinFileName,
      })
      .select("id")
      .single();

    if (runError) {
      throw runError;
    }

    const databaseResults =
      body.results.map((result) => ({
        id: result.id,

        run_id: run.id,

        reference:
          result.reference,

        status:
          result.status,

        ledger_transaction:
          result.ledgerTransaction ??
          null,

        stablecoin_transaction:
          result.stablecoinTransaction ??
          null,

        difference:
          result.difference ?? null,

        resolution_status:
          result.status === "matched"
            ? null
            : "open",

        resolution_note: null,

        resolved_at: null,
      }));

    const {
      error: resultsError,
    } = await supabaseAdmin
      .from(
        "reconciliation_results"
      )
      .insert(databaseResults);

    if (resultsError) {
      await supabaseAdmin
        .from("reconciliation_runs")
        .delete()
        .eq("id", run.id);

      throw resultsError;
    }

    return Response.json({
      runId: run.id,
    });
  } catch (error) {
    console.error(
      "Create reconciliation run error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to save reconciliation run.";

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