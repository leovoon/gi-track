import { Skeleton } from "./ui/skeleton";

export default function SkeletonIssues() {
  return (
    <>
      {Array.from(Array(7), (_, i) => (
        <div
          key={i}
          className="grid grid-cols-8 sm:grid-cols-9 gap-4 mt-6 space-y-4"
        >
          <div className="col-span-1 grid place-items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="col-span-7 sm:col-span-6 space-y-4">
            <Skeleton className="h-4 w-[200px] sm:w-[250px] " />
            <Skeleton className="h-4 w-[100px] sm:w-[150px] " />
          </div>
          <div className="col-span-8 sm:col-span-2 grid place-items-end sm:place-items-center">
            <div className="flex gap-2 justify-start items-center p-2">
              <Skeleton className="h-4 w-5 " />
              <Skeleton className="h-4 w-5 rounded-full" />
              <Skeleton className="h-4 w-5 " />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
