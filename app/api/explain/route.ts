type ExceptionRequest = {
  status: string;
  reference: string;
  difference?: number;
  ledger?: {
    customer?: string;
    amount?: number;
    currency?: string;
    date?: string;
  } | null;
  stablecoin?: {
    amount?: number;
    asset?: string;
    network?: string;
    date?: string;
    txHash?: string;
  } | null;
};

export async function POST(request: Request) {
  try {
    const exception: ExceptionRequest =
      await request.json();

    // Simulate a short AI processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    if (exception.status === "amount_mismatch") {
      const difference = exception.difference ?? 0;

      const absoluteDifference = Math.abs(difference);

      return Response.json({
        summary:
          difference < 0
            ? `The stablecoin transaction is $${absoluteDifference.toFixed(
                2
              )} below the amount recorded in the internal ledger.`
            : `The stablecoin transaction is $${absoluteDifference.toFixed(
                2
              )} above the amount recorded in the internal ledger.`,

        possibleCauses: [
          "A transaction or withdrawal fee may have reduced the final settlement amount.",
          "The sender may have submitted an incorrect payment amount.",
          "The internal ledger amount may not reflect a fee or adjustment applied during settlement.",
        ],

        recommendedNextStep:
          "Review the payment provider or blockchain transaction details and compare any fees or adjustments against the original payment instruction.",

        confidence: "medium",
      });
    }

    if (exception.status === "missing_stablecoin") {
      return Response.json({
        summary:
          "The internal ledger contains this transaction, but no corresponding stablecoin settlement was found in the uploaded stablecoin data.",

        possibleCauses: [
          "The stablecoin transaction may still be pending or may not have been submitted.",
          "The settlement may use a different reference than the internal ledger record.",
          "The stablecoin export may not include the relevant transaction or time period.",
        ],

        recommendedNextStep:
          "Search the payment or wallet system using the ledger reference, amount, and date to determine whether settlement occurred under another transaction identifier.",

        confidence: "medium",
      });
    }

    if (exception.status === "missing_ledger") {
      return Response.json({
        summary:
          "A stablecoin transaction was found, but there is no corresponding transaction in the uploaded internal ledger.",

        possibleCauses: [
          "The ledger entry may not have been created yet.",
          "The transaction may have been recorded using a different reference.",
          "The stablecoin transaction may be unrelated to the ledger population being reconciled.",
        ],

        recommendedNextStep:
          "Search the internal ledger using the stablecoin amount, settlement date, and transaction reference before determining whether a ledger entry is missing.",

        confidence: "medium",
      });
    }

    if (exception.status === "duplicate") {
      return Response.json({
        summary:
          "Multiple transactions share the same reconciliation reference, preventing a unique one-to-one match.",

        possibleCauses: [
          "The same transaction may have been imported more than once.",
          "Multiple legitimate transactions may share the same reference.",
          "A source-system reference may not be unique.",
        ],

        recommendedNextStep:
          "Review all transactions sharing this reference and compare their amounts, dates, and transaction identifiers before selecting the appropriate match.",

        confidence: "high",
      });
    }

    return Response.json({
      summary:
        "The transaction requires additional investigation.",

      possibleCauses: [
        "The available reconciliation data is not sufficient to identify a specific cause.",
      ],

      recommendedNextStep:
        "Review the underlying ledger and settlement records for additional transaction details.",

      confidence: "low",
    });
  } catch (error) {
    console.error(
      "Mock AI explanation error:",
      error
    );

    return Response.json(
      {
        error:
          "Unable to generate mock AI explanation.",
      },
      {
        status: 500,
      }
    );
  }
}