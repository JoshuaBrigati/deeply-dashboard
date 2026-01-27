import {
  Skeleton,
  SkeletonCard,
  SkeletonRing,
  SkeletonRadar,
} from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-72 mx-auto mb-3" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Hero section skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-64 mb-6" />
            <SkeletonRing />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-72 mb-4" />
            <SkeletonRadar />
          </div>
        </div>

        {/* Dimension breakdown skeleton */}
        <div className="mb-12">
          <Skeleton className="h-8 w-56 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
