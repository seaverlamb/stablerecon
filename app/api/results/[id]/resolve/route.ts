import { supabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    const body =
      await request.json();

    const note =
      typeof body.note === "string"
        ? body.note.trim()
        : "";

    if (!note) {
      return Response.json(
        {
          error:
            "A resolution note is required.",
        },
        {
          status: 400,
        }
      );
    }

    const resolvedAt =
      new Date().toISOString();

    const {
      data,
      error,
    } = await supabaseAdmin
      .from(
        "reconciliation_results"
      )
      .update({
        resolution_status:
          "resolved",

        resolution_note:
          note,

        resolved_at:
          resolvedAt,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      id: data.id,
      resolutionStatus:
        "resolved",
      resolutionNote:
        data.resolution_note,
      resolvedAt:
        data.resolved_at,
    });
  } catch (error) {
    console.error(
      "Resolve exception error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to resolve exception.";

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