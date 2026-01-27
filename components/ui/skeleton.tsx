import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-sm",
        className
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-2 flex-1 rounded-full" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-2 flex-1 rounded-full" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

function SkeletonRing({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center gap-4", className)}
      aria-hidden="true"
    >
      <div className="relative h-56 w-56">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-8 w-36 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

function SkeletonRadar({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center gap-4 w-full", className)}
      aria-hidden="true"
    >
      <Skeleton className="h-64 md:h-80 w-full rounded-xl" />
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonRing, SkeletonRadar }
