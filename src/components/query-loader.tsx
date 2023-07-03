import { cn } from "@/lib/utils";
import { useIsFetching } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export default function QueryLoader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const isFetching = useIsFetching({
    type: "inactive",
  });

  const [progress, setProgress] = useState(0);

  async function startProgress() {
    setProgress(20);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setProgress(50);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setProgress(100);
  }

  useEffect(() => {
    if (isFetching) startProgress();
  }, []);

  if (!isFetching) return null;

  return (
    <>
      <div
        className={cn("items-center hidden sm:inline-flex", className)}
        {...props}
      >
        <Loader2 className="animate-spin duration-500" />
      </div>
      <LoadingBar
        className="sm:hidden !bg-muted-foreground"
        height={5}
        progress={progress}
        transitionTime={500}
        onLoaderFinished={() => setProgress(100)}
      />
    </>
  );
}
