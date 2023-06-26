import useLabels from "@/hooks/useLabels";
import { Badge } from "./ui/badge";
import { getLabelColor } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type Label = {
  id: number;
  name: string;
};

export default function Labels() {
  const labels = useLabels();

  if (labels.status === "idle" && labels.isLoading) return null;

  if (labels.isError) return <p>Something went wrong when fetching labels.</p>;

  if (labels.isLoading)
    return (
      <div className="flex flex-wrap gap-1">
        <Skeleton className="h-4 w-[45px] " />
        <Skeleton className="h-4 w-[80px] " />
        <Skeleton className="h-4 w-[100px] " />
        <Skeleton className="h-4 w-[50px] " />
        <Skeleton className="h-4 w-[80px] " />
        <Skeleton className="h-4 w-[120px] " />
        <Skeleton className="h-4 w-[50px] " />
        <Skeleton className="h-4 w-[140px] " />
        <Skeleton className="h-4 w-[50px] " />
      </div>
    );

  return (
    <ul className="flex flex-wrap gap-1">
      {labels.data?.map((label: Label) => (
        <div key={label.id}>
          <Badge variant={getLabelColor(label.name)}>{label.name}</Badge>
        </div>
      ))}
    </ul>
  );
}
