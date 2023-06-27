import { cn } from "@/lib/utils";
import { CheckCircle, CircleDot, LucideProps } from "lucide-react";

export default function StateIcon(props: LucideProps & { state: string }) {
  const { className } = props;
  return (
    <>
      {props.state === "closed" ? (
        <CheckCircle className={cn("text-purple-600", className)} {...props} />
      ) : (
        <CircleDot className={cn("text-green-600", className)} {...props} />
      )}
    </>
  );
}
