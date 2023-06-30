import { cn } from "@/lib/utils";
import { useIsFetching } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function QueryLoader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const isFetching = useIsFetching({
    type: "inactive",
  });
  if (!isFetching) return null;

  return (
    <div className={cn("inline-flex items-center", className)} {...props}>
      <Loader2 className="animate-spin duration-500" />
    </div>
  );
}
