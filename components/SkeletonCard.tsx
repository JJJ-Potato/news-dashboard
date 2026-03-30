export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-200" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
        </div>
        <div className="w-7 h-7 rounded-lg bg-gray-100" />
      </div>
      <div className="divide-y divide-gray-50">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-4 py-3 flex gap-2.5">
            <div className="w-4 h-3 bg-gray-100 rounded mt-1 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-gray-200 rounded w-full" />
              <div className="h-3.5 bg-gray-200 rounded w-4/5" />
              <div className="h-3 bg-gray-100 rounded w-1/3 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
