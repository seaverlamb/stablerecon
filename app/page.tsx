import Link from "next/link";

const workflow = [
  {
    number: "01",
    title: "Ingest",
    text: "Bring together ledger, provider, and settlement records.",
  },
  {
    number: "02",
    title: "Reconcile",
    text: "Apply deterministic matching rules across systems.",
  },
  {
    number: "03",
    title: "Investigate",
    text: "Surface breaks with the context analysts need.",
  },
  {
    number: "04",
    title: "Resolve",
    text: "Document the decision and preserve the audit trail.",
  },
];

const personas = [
  {
    title: "Payments Operations",
    text: "Resolve settlement discrepancies without jumping between systems.",
  },
  {
    title: "Treasury Operations",
    text: "Maintain visibility into stablecoin movement and settlement status.",
  },
  {
    title: "Finance & Controllers",
    text: "Keep internal records aligned with external settlement activity.",
  },
  {
    title: "Digital Asset Operations",
    text: "Manage stablecoin breaks through a controlled workflow.",
  },
];

export default function MarketingPage() {
  return (
    <main className="bg-white text-slate-950">
      {/* NAV */}
      <header className="relative z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="text-[26px] font-bold tracking-[-0.04em] text-slate-950"
          >
            StableRecon
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            <a href="#product" className="nav-link">
              Product
            </a>

            <a href="#workflow" className="nav-link">
              How it works
            </a>

            <a href="#developers" className="nav-link">
              Developers
            </a>

            <a href="#solutions" className="nav-link">
              Solutions
            </a>

            <a href="#controls" className="nav-link">
              Controls
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/reconcile"
              className="hidden text-sm font-medium text-slate-700 transition hover:text-slate-950 sm:block"
            >
              Open app
            </Link>

            <a
              href="#contact"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Book a demo
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-8%] top-[4%] h-[720px] w-[920px] rounded-full bg-slate-100/80 blur-[110px]" />
          <div className="absolute right-[12%] top-[28%] h-[460px] w-[620px] rounded-full bg-zinc-100/70 blur-[100px]" />
        </div>

        <div className="relative mx-auto grid min-h-[820px] max-w-[1440px] items-center gap-16 px-6 py-20 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-24">
          {/* LEFT */}
          <div className="relative z-20 max-w-[650px]">
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
              Stablecoin settlement operations
            </p>

            <h1 className="text-[54px] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-[64px] lg:text-[70px]">
              Reconcile stablecoin settlement.
            </h1>

            <h2 className="mt-3 text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] text-slate-400 sm:text-[50px] lg:text-[56px]">
              Resolve exceptions faster.
            </h2>

            <p className="mt-8 max-w-[600px] text-lg leading-8 text-slate-600">
              Connect your internal financial records with stablecoin
              settlement data. Detect breaks, investigate exceptions, and
              maintain an audit-ready record — all in one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 rounded-xl bg-slate-950 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Book a demo
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#workflow"
                className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-900 text-[9px]">
                  ▶
                </span>
                See how it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-500">
              <ProofPoint text="Deterministic matching" />
              <ProofPoint text="AI-assisted investigations" />
              <ProofPoint text="Audit-ready records" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative z-10 min-h-[650px]">
            <svg
              className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
              viewBox="0 0 760 650"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M175 120 C240 130 195 250 330 285"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
                className="connector-line"
              />

              <path
                d="M165 300 C245 300 250 315 330 315"
                stroke="#6EE7B7"
                strokeWidth="2"
                strokeLinecap="round"
                className="connector-line connector-delay-1"
              />

              <path
                d="M160 490 C250 480 245 360 330 345"
                stroke="#A1A1AA"
                strokeWidth="2"
                strokeLinecap="round"
                className="connector-line connector-delay-2"
              />

              <circle
                cx="330"
                cy="285"
                r="5"
                fill="#64748B"
                className="pulse-dot"
              />

              <circle
                cx="330"
                cy="315"
                r="5"
                fill="#10B981"
                className="pulse-dot connector-delay-1"
              />

              <circle
                cx="330"
                cy="345"
                r="5"
                fill="#71717A"
                className="pulse-dot connector-delay-2"
              />
            </svg>

            <div className="source-card source-card-one absolute left-[1%] top-[4%] z-20 hidden lg:flex">
              <SourceIcon type="ledger" />

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Internal Ledger
                </p>
                <p className="mt-1 text-xs text-slate-500">Transactions</p>
              </div>
            </div>

            <div className="source-card source-card-two absolute left-[0%] top-[31%] z-20 hidden lg:flex">
              <SourceIcon type="provider" />

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Stablecoin Provider
                </p>
                <p className="mt-1 text-xs text-slate-500">Settlement data</p>
              </div>
            </div>

            <div className="source-card source-card-three absolute left-[-3%] top-[58%] z-20 hidden lg:flex">
              <SourceIcon type="chain" />

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Blockchain
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  On-chain activity
                </p>
              </div>
            </div>

            <div className="product-window absolute bottom-[8%] right-0 z-10 w-full max-w-[610px] overflow-hidden rounded-[24px] border border-white/90 bg-white/90 p-4 shadow-[0_35px_100px_rgba(15,23,42,0.14)] backdrop-blur-md lg:w-[72%]">
              <div className="flex min-h-[390px] overflow-hidden rounded-[18px] border border-slate-100 bg-white">
                <aside className="hidden w-[135px] shrink-0 border-r border-slate-100 bg-slate-50/70 p-5 sm:block">
                  <p className="mb-7 text-sm font-bold tracking-[-0.03em]">
                    StableRecon
                  </p>

                  <DashboardNavItem active label="Reconcile" icon="⌂" />
                  <DashboardNavItem label="Runs" icon="◫" />
                  <DashboardNavItem label="Exceptions" icon="△" />
                  <DashboardNavItem label="Reports" icon="▤" />
                </aside>

                <div className="min-w-0 flex-1 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                        Reconciliation Run
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Oct 2, 2026 · USDC
                      </p>
                    </div>

                    <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
                      Completed
                    </span>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-5 border-b border-slate-100 pb-6 lg:grid-cols-4">
                    <DashboardMetric value="10,842" label="Transactions" />
                    <DashboardMetric value="10,559" label="Matched" />
                    <DashboardMetric
                      value="283"
                      label="Exceptions"
                      alert
                    />
                    <DashboardMetric value="97.4%" label="Match rate" />
                  </div>

                  <div className="mt-5">
                    <div className="grid grid-cols-[1fr_1.5fr_1fr_auto] gap-3 border-b border-slate-100 pb-3 text-[10px] font-medium text-slate-400">
                      <span>Reference</span>
                      <span>Exception</span>
                      <span>Amount</span>
                      <span>Status</span>
                    </div>

                    <DashboardRow
                      reference="INV-10291"
                      issue="Amount mismatch"
                      amount="$9,995 / $10,000"
                      status="Open"
                    />

                    <DashboardRow
                      reference="INV-10294"
                      issue="Missing settlement"
                      amount="$5,000"
                      status="Open"
                    />

                    <DashboardRow
                      reference="INV-10302"
                      issue="Duplicate"
                      amount="$2,500"
                      status="Review"
                    />

                    <DashboardRow
                      reference="INV-10308"
                      issue="Missing ledger"
                      amount="$1,750"
                      status="Open"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center lg:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">
              Scroll to explore
            </span>

            <span className="mt-4 animate-bounce text-xl text-slate-500">
              ↓
            </span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section
        id="product"
        className="border-t border-slate-100 bg-slate-50 py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="section-kicker">The problem</p>

            <h2 className="section-title">
              Stablecoin settlement creates a new reconciliation surface.
            </h2>

            <p className="section-copy">
              Your internal ledger, provider data, and blockchain settlement
              records can all describe the same movement differently.
              StableRecon helps identify where the break occurred.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <SystemCard
              label="Internal Ledger"
              amount="$10,000.00"
              detail="INV-10291"
              state="Expected"
            />

            <SystemCard
              label="Provider"
              amount="$9,995.00"
              detail="TXN-8892"
              state="Settled"
            />

            <SystemCard
              label="Blockchain"
              amount="$9,995.00"
              detail="0x83...4f2c"
              state="Confirmed"
            />
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-kicker">How it works</p>

          <h2 className="section-title max-w-3xl">
            From settlement data to resolution.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <WorkflowCard
                key={item.number}
                number={item.number}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPER / API */}
      <section
        id="developers"
        className="border-y border-slate-800 bg-slate-950 py-28 text-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          {/* LEFT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">
              Built for developers
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Reconciliation infrastructure,
              <br />
              not just a dashboard.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Integrate StableRecon directly into your payment and settlement
              infrastructure. Submit records, run reconciliation, retrieve
              exceptions, and synchronize resolution state through APIs.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <span className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                API preview
              </span>

              <a
                href="#contact"
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                Talk to us
              </a>
            </div>

            <div className="mt-10 space-y-5">
              <ApiCapability
                method="POST"
                endpoint="/v1/transactions"
                text="Send ledger and settlement transactions."
              />

              <ApiCapability
                method="POST"
                endpoint="/v1/reconciliations"
                text="Trigger deterministic reconciliation."
              />

              <ApiCapability
                method="GET"
                endpoint="/v1/exceptions"
                text="Retrieve open reconciliation breaks."
              />

              <ApiCapability
                method="PATCH"
                endpoint="/v1/exceptions/:id"
                text="Update resolution and workflow state."
              />
            </div>

            <p className="mt-8 max-w-xl text-xs leading-5 text-slate-500">
              API capabilities shown here represent planned product direction.
            </p>
          </div>

          {/* RIGHT */}
          <div className="overflow-hidden rounded-[20px] border border-slate-700/80 bg-[#11151b] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                </div>

                <span className="font-mono text-xs text-slate-400">
                  StableRecon API
                </span>
              </div>

              <span className="rounded-full border border-emerald-900/70 bg-emerald-950/50 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                API preview
              </span>
            </div>

            <div className="border-b border-slate-800 bg-[#0d1117] px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-emerald-950 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300">
                  POST
                </span>

                <span className="font-mono text-sm text-slate-200">
                  /v1/reconciliations
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Reconcile a ledger record against stablecoin settlement data.
              </p>
            </div>

            <div className="border-b border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800/70 px-5 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Request
                </span>

                <span className="font-mono text-[10px] text-slate-600">
                  application/json
                </span>
              </div>

              <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-6 text-slate-300">
{`{
  "ledger": {
    "transaction_id": "txn_10291",
    "reference": "INV-10291",
    "customer": "Acme Payments",
    "amount": 10000.00,
    "currency": "USD",
    "date": "2026-10-02"
  },
  "settlement": {
    "tx_hash": "0x83f27...4f2c",
    "reference": "INV-10291",
    "wallet": "0x82a9...91bc",
    "amount": 9995.00,
    "asset": "USDC",
    "network": "BASE",
    "date": "2026-10-02"
  },
  "rules": {
    "amount_tolerance": 0,
    "date_tolerance_days": 1
  }
}`}
              </pre>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-slate-800/70 px-5 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Response
                </span>

                <span className="font-mono text-[10px] font-semibold text-emerald-400">
                  200 OK · 84ms
                </span>
              </div>

              <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-6 text-slate-300">
{`{
  "reconciliation_id": "rec_01K7F8Q9",
  "reference": "INV-10291",
  "status": "amount_mismatch",
  "matched": false,
  "difference": -5.00,
  "match_basis": {
    "reference": "exact",
    "amount": "mismatch",
    "date": "exact",
    "asset": "compatible"
  },
  "exception": {
    "id": "exc_01K7F8RA",
    "status": "open",
    "type": "amount_mismatch"
  },
  "created_at": "2026-10-02T21:14:38Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* EXCEPTION MANAGEMENT */}
      <section className="py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
          <div>
            <p className="section-kicker">Exception management</p>

            <h2 className="section-title">
              One queue for every reconciliation break.
            </h2>

            <p className="section-copy">
              Centralize investigation instead of forcing analysts to work
              across spreadsheets, provider dashboards, block explorers, and
              internal systems.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <p className="font-semibold">Exception Queue</p>
              <span className="text-sm text-slate-500">283 open</span>
            </div>

            <ExceptionMarketingRow
              reference="INV-10291"
              type="Amount mismatch"
              owner="Sarah Kim"
              age="2h"
              status="Open"
            />

            <ExceptionMarketingRow
              reference="INV-10294"
              type="Missing settlement"
              owner="Michael Chen"
              age="5h"
              status="Open"
            />

            <ExceptionMarketingRow
              reference="INV-10302"
              type="Duplicate"
              owner="Priya Shah"
              age="1d"
              status="Review"
            />

            <ExceptionMarketingRow
              reference="INV-10308"
              type="Missing ledger"
              owner="Daniel Park"
              age="1d"
              status="Open"
              last
            />
          </div>
        </div>
      </section>

      {/* EXPLAINABILITY */}
      <section className="border-y border-slate-100 bg-slate-50 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="section-kicker">Explainability</p>

            <h2 className="section-title">
              See exactly why a transaction didn&apos;t match.
            </h2>

            <p className="section-copy">
              Keep matching deterministic while giving analysts the context
              they need to understand each exception.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <MatchRow
              label="Reference"
              ledger="INV-10291"
              settlement="INV-10291"
              result="Exact"
            />

            <MatchRow
              label="Amount"
              ledger="$10,000"
              settlement="$9,995"
              result="Mismatch"
              warning
            />

            <MatchRow
              label="Date"
              ledger="Oct 2"
              settlement="Oct 2"
              result="Exact"
            />

            <MatchRow
              label="Asset"
              ledger="USD"
              settlement="USDC"
              result="Compatible"
            />

            <div className="mt-5 rounded-xl bg-red-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                Result
              </p>

              <p className="mt-2 text-sm font-medium text-red-700">
                Amount mismatch · -$5.00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-kicker">Operations visibility</p>

          <h2 className="section-title max-w-3xl">
            Know where your reconciliation operation stands.
          </h2>

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

      {/* AUDITABILITY */}
      <section
        id="controls"
        className="border-y border-slate-100 bg-slate-50 py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="section-kicker">Auditability</p>

            <h2 className="section-title">
              Every decision leaves a record.
            </h2>

            <p className="section-copy">
              Preserve the evidence, ownership, reasoning, and timestamps behind
              every reconciliation decision.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <TimelineRow time="10:04" text="Exception detected" />
            <TimelineRow time="10:08" text="Assigned to Alex Patel" />
            <TimelineRow time="10:14" text="Investigation opened" />
            <TimelineRow time="10:17" text="Evidence added" />
            <TimelineRow time="10:22" text="Resolution: Provider fee" />
            <TimelineRow time="10:23" text="Exception resolved" last />
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section id="solutions" className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-kicker">Built for financial operations</p>

          <h2 className="section-title max-w-3xl">
            A shared settlement workflow for every team.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {personas.map((persona) => (
              <div
                key={persona.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {persona.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {persona.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION STACK */}
      <section className="border-y border-slate-100 bg-slate-50 py-28">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <p className="section-kicker">Settlement stack</p>

          <h2 className="section-title mx-auto max-w-3xl">
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
                className="rounded-xl border border-slate-200 bg-white px-5 py-5 text-sm font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-6 text-slate-500">
            Start with file-based ingestion today. Add direct integrations and
            APIs as your settlement workflow scales.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Modernize stablecoin reconciliation.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Turn reconciliation breaks into a controlled, explainable
            operations workflow.
          </p>

          <div className="mt-9 flex justify-center gap-3">
            <a
              href="mailto:hello@stablerecon.com"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Book a demo
            </a>

            <Link
              href="/reconcile"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Open app
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-slate-800 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>© 2026 StableRecon</span>
          <span>Stablecoin settlement operations infrastructure.</span>
        </div>
      </footer>
    </main>
  );
}

/* HELPERS */

function ProofPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-emerald-600">✓</span>
      <span>{text}</span>
    </div>
  );
}

function SourceIcon({
  type,
}: {
  type: "ledger" | "provider" | "chain";
}) {
  const styles = {
    ledger: "border-slate-200 bg-slate-50 text-slate-700",
    provider: "border-emerald-100 bg-emerald-50 text-emerald-600",
    chain: "border-zinc-200 bg-zinc-50 text-zinc-700",
  };

  const icons = {
    ledger: "◉",
    provider: "▤",
    chain: "↗",
  };

  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-xl border text-lg font-bold ${styles[type]}`}
    >
      {icons[type]}
    </div>
  );
}

function DashboardNavItem({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <div
      className={`mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium ${
        active
          ? "bg-slate-100 text-slate-950"
          : "text-slate-500"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function DashboardMetric({
  value,
  label,
  alert = false,
}: {
  value: string;
  label: string;
  alert?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-xl font-semibold tracking-[-0.03em] ${
          alert ? "text-red-500" : "text-slate-950"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-400">{label}</p>
    </div>
  );
}

function DashboardRow({
  reference,
  issue,
  amount,
  status,
}: {
  reference: string;
  issue: string;
  amount: string;
  status: "Open" | "Review";
}) {
  return (
    <div className="grid grid-cols-[1fr_1.5fr_1fr_auto] items-center gap-3 border-b border-slate-50 py-3 text-[10px]">
      <span className="font-medium text-slate-700">{reference}</span>
      <span className="text-slate-600">{issue}</span>
      <span className="text-slate-500">{amount}</span>

      <span
        className={`rounded-full px-2.5 py-1 font-medium ${
          status === "Open"
            ? "bg-red-50 text-red-500"
            : "bg-amber-50 text-amber-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function SystemCard({
  label,
  amount,
  detail,
  state,
}: {
  label: string;
  amount: string;
  detail: string;
  state: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>

      <p className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">
        {amount}
      </p>

      <p className="mt-2 font-mono text-xs text-slate-500">{detail}</p>

      <span className="mt-5 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        {state}
      </span>
    </div>
  );
}

function WorkflowCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
      <span className="text-sm font-semibold text-slate-500">{number}</span>

      <h3 className="mt-8 text-xl font-semibold text-slate-950">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function ApiCapability({
  method,
  endpoint,
  text,
}: {
  method: "GET" | "POST" | "PATCH";
  endpoint: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-[58px] shrink-0">
        <span
          className={`inline-flex rounded-md px-2 py-1 font-mono text-[10px] font-bold ${
            method === "GET"
              ? "bg-slate-800 text-slate-300"
              : method === "POST"
                ? "bg-emerald-950 text-emerald-300"
                : "bg-amber-950 text-amber-300"
          }`}
        >
          {method}
        </span>
      </div>

      <div>
        <p className="font-mono text-xs font-medium text-slate-200">
          {endpoint}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function ExceptionMarketingRow({
  reference,
  type,
  owner,
  age,
  status,
  last = false,
}: {
  reference: string;
  type: string;
  owner: string;
  age: string;
  status: "Open" | "Review";
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-3 px-6 py-5 text-sm sm:grid-cols-[1fr_1.5fr_1fr_0.6fr_0.7fr] ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <span className="font-medium text-slate-950">{reference}</span>
      <span className="text-slate-600">{type}</span>
      <span className="text-slate-500">{owner}</span>
      <span className="text-slate-500">{age}</span>

      <span
        className={
          status === "Open"
            ? "text-red-500"
            : "text-amber-600"
        }
      >
        {status}
      </span>
    </div>
  );
}

function MatchRow({
  label,
  ledger,
  settlement,
  result,
  warning = false,
}: {
  label: string;
  ledger: string;
  settlement: string;
  result: string;
  warning?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1.1fr_1fr_1fr_auto] items-center gap-3 border-b border-slate-100 py-4 text-sm">
      <span className="font-medium text-slate-900">{label}</span>
      <span className="text-slate-600">{ledger}</span>
      <span className="text-slate-600">{settlement}</span>

      <span
        className={
          warning
            ? "font-semibold text-red-600"
            : "font-semibold text-emerald-700"
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
    <div className="rounded-2xl border border-slate-200 bg-white p-7">
      <p className="text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">{label}</p>
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
      <span className="pt-0.5 text-xs font-medium text-slate-400">
        {time}
      </span>

      <div className="flex flex-col items-center">
        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />

        {!last && <div className="h-10 w-px bg-slate-200" />}
      </div>

      <span className="text-sm font-medium text-slate-700">{text}</span>
    </div>
  );
}