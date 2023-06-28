import { Skeleton } from "./ui/skeleton";

export default function SkeletonIssue() {
  return (
    <div className="space-y-4">
      <Skeleton className="w-12 h-4 rounded-full" />
      <Skeleton className="w-full h-5 " />
      <div className="flex gap-1">
        <Skeleton className="w-12 h-4 rounded-full" />
        <Skeleton className="w-14 h-4 rounded-full" />
        <Skeleton className="w-14 h-4 rounded-full" />
      </div>
      <Skeleton className="w-full h-4 " />
    </div>
  );
}
