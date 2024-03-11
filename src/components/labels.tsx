import useLabels from "@/hooks/useLabels";
import { Badge } from "./ui/badge";
import { cn, getLabelColor } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useLabelStore } from "@/stores/label";
import { shallow } from "zustand/shallow";
import { useCallback } from "react";

type Label = {
  id: number;
  name: string;
};

export default function Labels() {
  const labels = useLabels();

  const [selectedLabel, setSelectedLabel] = useLabelStore(
    (state) => [state.label, state.setLabel],
    shallow
  );

  const handleLabelClick = useCallback((label: string) => {
    if (selectedLabel.includes(label)) {
      setSelectedLabel(selectedLabel.filter((item) => item !== label));
      return;
    }
    setSelectedLabel([...selectedLabel, label]);
  }, [selectedLabel])


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
        <Badge
          onClick={() => handleLabelClick(label.name)}
          className={cn(
            " border-2 border-b-4 border-transparent border-b-gray-300 dark:border-b-gray-500 cursor-pointer",
            selectedLabel.includes(label.name) &&
            "border-b-1 border-gray-500 font-semibold"
          )}
          key={label.id}
          variant={getLabelColor(label.name)}
        >
          {label.name}
        </Badge>
      ))}
    </ul>
  );
}
