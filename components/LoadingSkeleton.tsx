export default function LoadingSkeleton() {
  return (
    <div
      className="mt-8 space-y-4"
      aria-label="Loading reconciliation"
    >
      <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mt-3 h-7 w-12 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

        <div className="mt-4 h-4 w-5/6 animate-pulse rounded bg-gray-200" />

        <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
