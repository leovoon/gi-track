import { Skeleton } from "./ui/skeleton";

export default function SkeletonComments() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
        <div className="w-full border border-muted flex flex-col">
          <Skeleton className="w-full h-10 rounded-none" />
          <div className="p-2">
            <Skeleton className="w-[180px] h-4" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="w-8 h-8 shrink-0 sm:w-10 sm:h-10 rounded-full" />
        <div className="w-full border border-muted flex flex-col">
          <Skeleton className="w-full h-10 rounded-none" />
          <div className="p-2 space-y-1">
            <Skeleton className="w-[220px] h-4" />
            <Skeleton className="w-[120px] h-4" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="w-8 h-8 shrink-0 sm:w-10 sm:h-10 rounded-full" />
        <div className="w-full border border-muted flex flex-col">
          <Skeleton className="w-full h-10 rounded-none" />
          <div className="p-2 space-y-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[200px] h-4" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="w-8 h-8 shrink-0 sm:w-10 sm:h-10 rounded-full" />
        <div className="w-full border border-muted flex flex-col">
          <Skeleton className="w-full h-10 rounded-none" />
          <div className="p-2 space-y-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
