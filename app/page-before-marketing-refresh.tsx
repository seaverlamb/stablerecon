import Link from "next/link";

const exceptionRows = [
  {
    reference: "INV-10291",
    type: "Amount mismatch",
    owner: "J. Chen",
    age: "18m",
    status: "Open",
  },
  {
    reference: "INV-10294",
    type: "Missing settlement",
    owner: "A. Patel",
    age: "1h 32m",
    status: "Open",
  },
  {
    reference: "INV-10302",
    type: "Duplicate",
    owner: "S. Kim",
    age: "3h 11m",
    status: "Review",
  },
  {
    reference: "INV-10308",
    type: "Missing ledger",
    owner: "M. Ross",
    age: "6h 44m",
    status: "Open",
  },
];

const workflow = [
  {
    number: "01",
    title: "Ingest",
    description:
      "Bring together internal ledger activity and stablecoin settlement data.",
  },
  {
    number: "02",
    title: "Reconcile",
    description:
      "Apply deterministic matching logic across transactions and settlement records.",
  },
  {
    number: "03",
    title: "Investigate",
    description:
      "Surface discrepancies with the context analysts need to understand the break.",
  },
  {
    number: "04",
    title: "Resolve",
    description:
      "Capture ownership, resolution reason, analyst notes, and decision history.",
  },
];

const personas = [
  {
    title: "Payments Operations",
    description:
      "Resolve settlement discrepancies without jumping between systems.",
  },
  {
    title: "Treasury Operations",
    description:
      "Maintain visibility into stablecoin movement and settlement status.",
  },
  {
    title: "Finance & Controllers",
    description:
      "Keep internal financial records aligned with external settlement activity.",
  },
  {
    title: "Digital Asset Operations",
    description:
      "Manage stablecoin exceptions through a controlled operational workflow.",
  },
];

export default function MarketingPage() {
  return (
    <main className="overflow-hidden bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-gray-950"
          >
            StableRecon
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#product"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              Product
            </a>

            <a
              href="#workflow"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              How it works
            </a>

            <a
              href="#solutions"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              Solutions
            </a>

            <a
              href="#controls"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              Controls
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/reconcile"
              className="hidden text-sm font-medium text-gray-700 transition hover:text-gray-950 sm:block"
            >
              Open app
            </Link>

            <a
              href="#contact"
              className="rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              Book a demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-gray-100">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-32">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
              Stablecoin settlement operations
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-6xl lg:text-7xl">
              Reconcile stablecoin settlement.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Connect internal financial records with stablecoin settlement
              activity, detect reconciliation breaks, and give operations teams
              one place to investigate and resolve exceptions.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
              >
                Book a demo
              </a>

              <a
                href="#product"
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                See how it works
              </a>
            </div>

            <p className="mt-7 text-sm text-gray-500">
              Deterministic reconciliation. Human-controlled resolution.
            </p>
          </div>

          {/* Product mock */}
          <div className="relative">
            <div className="absolute -inset-10 -z-10 rounded-full bg-gray-100 blur-3xl" />

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/70">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div>
                  <p className="text-sm font-semibold text-gray-950">
                    Reconciliation Run
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    October 2, 2026 · USDC settlement
                  </p>
                </div>

                <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-gray-100 sm:grid-cols-4">
                {[
                  ["10,842", "References"],
                  ["10,559", "Matched"],
                  ["283", "Exceptions"],
                  ["97.4%", "Match rate"],
                ].map(([value, label]) => (
                  <div key={label} className="bg-white px-5 py-6">
                    <p className="text-2xl font-semibold tracking-tight text-gray-950">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-950">
                    Exception Queue
                  </p>

                  <span className="text-xs text-gray-500">283 open</span>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  {exceptionRows.slice(0, 3).map((row, index) => (
                    <div
                      key={row.reference}
                      className={`grid grid-cols-[1fr_1.5fr_auto] items-center gap-4 px-4 py-4 text-xs ${
                        index !== 2 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <span className="font-medium text-gray-900">
                        {row.reference}
                      </span>

                      <span className="text-gray-600">{row.type}</span>

                      <span className="rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              The problem
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-gray-950 sm:text-5xl">
              Stablecoin settlement creates a new reconciliation surface.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Internal ledgers, providers, custodians, and blockchains can
              describe the same financial movement differently. When those
              records fail to align, operations teams need to determine where
              the break occurred and why.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <SystemCard
              label="Internal Ledger"
              amount="$50,000.00"
              detail="REF-12881"
              state="Expected"
            />

            <SystemCard
              label="Provider"
              amount="$50,000.00"
              detail="REF-12881"
              state="Confirmed"
            />

            <SystemCard
              label="Blockchain"
              amount="$49,995.00"
              detail="0xa84f...91d2"
              state="Mismatch"
              warning
            />
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <p className="font-semibold text-gray-950">
              StableRecon identifies the break and creates an investigation
              workflow around it.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Workflow
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-gray-950 sm:text-5xl">
              From settlement data to resolved exception.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sm font-semibold text-gray-400">
                  {step.number}
                </span>

                <h3 className="mt-10 text-xl font-semibold text-gray-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exception management */}
      <section id="product" className="bg-gray-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                Exception management
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                One queue for every reconciliation break.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                Centralize exception investigation instead of forcing analysts
                to work across spreadsheets, provider dashboards, block
                explorers, and internal systems.
              </p>

              <div className="mt-8 space-y-4 text-sm text-gray-300">
                <FeatureLine text="Assign exception ownership" />
                <FeatureLine text="Track exception age and status" />
                <FeatureLine text="Capture analyst resolution notes" />
                <FeatureLine text="Preserve investigation history" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
              <div className="border-b border-gray-800 px-6 py-5">
                <p className="font-semibold">Exception Queue</p>
              </div>

              {exceptionRows.map((row, index) => (
                <div
                  key={row.reference}
                  className={`grid gap-3 px-6 py-5 text-sm sm:grid-cols-[1fr_1.5fr_1fr_0.7fr_0.7fr] ${
                    index !== exceptionRows.length - 1
                      ? "border-b border-gray-800"
                      : ""
                  }`}
                >
                  <span className="font-medium text-white">{row.reference}</span>
                  <span className="text-gray-400">{row.type}</span>
                  <span className="text-gray-400">{row.owner}</span>
                  <span className="text-gray-400">{row.age}</span>
                  <span className="text-amber-300">{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explainable reconciliation */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
            <div className="border-b border-gray-200 pb-5">
              <p className="text-sm font-medium text-gray-500">INV-10391</p>
              <p className="mt-1 text-lg font-semibold text-gray-950">
                Match analysis
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              <MatchRow
                label="Reference"
                left="INV-10391"
                right="INV-10391"
                result="Exact"
              />

              <MatchRow
                label="Amount"
                left="$10,000"
                right="$9,995"
                result="Mismatch"
                warning
              />

              <MatchRow
                label="Date"
                left="Oct 2"
                right="Oct 2"
                result="Exact"
              />

              <MatchRow
                label="Asset"
                left="USD"
                right="USDC"
                result="Compatible"
              />
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-white p-4">
              <span className="text-sm text-gray-500">Result</span>
              <span className="text-sm font-semibold text-amber-700">
                Amount mismatch · -$5.00
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Explainability
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-gray-950 sm:text-5xl">
              See exactly why transactions matched — or didn't.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Matching logic remains deterministic and explainable. Analysts
              can see the specific fields responsible for every reconciliation
              result before making a resolution decision.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Operations visibility
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-gray-950 sm:text-5xl">
              Know where your reconciliation operation stands.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Metric value="$184.2M" label="Reconciled volume" />
            <Metric value="28,421" label="Transactions" />
            <Metric value="98.6%" label="Match rate" />
            <Metric value="394" label="Open exceptions" />
            <Metric value="46" label="Overdue exceptions" />
            <Metric value="17 min" label="Median resolution" />
          </div>
        </div>
      </section>

      {/* Audit trail */}
      <section id="controls" className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Auditability
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-gray-950 sm:text-5xl">
              Every decision leaves a record.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Maintain the evidence, reasoning, ownership, and timestamps
              behind reconciliation decisions so the operational record is
              preserved.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <TimelineRow time="10:04" text="Exception detected" />
            <TimelineRow time="10:08" text="Assigned to Alex Patel" />
            <TimelineRow time="10:14" text="Investigation opened" />
            <TimelineRow time="10:17" text="Evidence added" />
            <TimelineRow time="10:22" text="Resolution: Provider fee" />
            <TimelineRow time="10:23" text="Exception resolved" last />
          </div>
        </div>
      </section>

      {/* Personas */}
      <section id="solutions" className="border-y border-gray-100 bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Built for financial operations
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-gray-950 sm:text-5xl">
              Give every team the same settlement truth.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {personas.map((persona) => (
              <div
                key={persona.title}
                className="rounded-2xl border border-gray-200 bg-white p-7"
              >
                <h3 className="text-xl font-semibold text-gray-950">
                  {persona.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {persona.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration architecture */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Settlement stack
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-gray-950 sm:text-5xl">
            Built to fit between your financial systems and settlement rails.
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Core ledger",
              "Stablecoin issuer",
              "Custodian",
              "Blockchain",
              "Banking core",
              "Data warehouse",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-5 text-sm font-semibold text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-6 text-gray-500">
            Start with file-based ingestion today. Connect systems directly as
            your settlement workflow scales.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-gray-950 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Still reconciling stablecoin settlement manually?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            See how StableRecon can turn settlement breaks into a controlled,
            explainable operations workflow.
          </p>

          <div className="mt-9 flex justify-center gap-3">
            <a
              href="mailto:hello@stablerecon.com"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
            >
              Book a demo
            </a>

            <Link
              href="/reconcile"
              className="rounded-lg border border-gray-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              Open app
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-gray-800 px-6 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 StableRecon</span>

          <span>Stablecoin settlement operations infrastructure.</span>
        </div>
      </footer>
    </main>
  );
}

function SystemCard({
  label,
  amount,
  detail,
  state,
  warning = false,
}: {
  label: string;
  amount: string;
  detail: string;
  state: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-500">{label}</span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            warning
              ? "bg-amber-50 text-amber-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {state}
        </span>
      </div>

      <p className="mt-8 text-3xl font-semibold tracking-tight text-gray-950">
        {amount}
      </p>

      <p className="mt-2 font-mono text-xs text-gray-500">{detail}</p>
    </div>
  );
}

function FeatureLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-[10px] text-white">
        ✓
      </div>
      <span>{text}</span>
    </div>
  );
}

function MatchRow({
  label,
  left,
  right,
  result,
  warning = false,
}: {
  label: string;
  left: string;
  right: string;
  result: string;
  warning?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1.1fr_1fr_1fr_auto] items-center gap-3 py-4 text-sm">
      <span className="font-medium text-gray-900">{label}</span>
      <span className="text-gray-600">{left}</span>
      <span className="text-gray-600">{right}</span>

      <span
        className={
          warning
            ? "font-semibold text-amber-700"
            : "font-semibold text-green-700"
        }
      >
        {result}
      </span>
    </div>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-7">
      <p className="text-3xl font-semibold tracking-tight text-gray-950">
        {value}
      </p>
      <p className="mt-2 text-sm text-gray-500">{label}</p>
    </div>
  );
}

function TimelineRow({
  time,
  text,
  last = false,
}: {
  time: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div className="grid grid-cols-[60px_20px_1fr] gap-3">
      <span className="pt-0.5 text-xs font-medium text-gray-400">{time}</span>

      <div className="flex flex-col items-center">
        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gray-950" />

        {!last && <div className="h-10 w-px bg-gray-200" />}
      </div>

      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  );
}