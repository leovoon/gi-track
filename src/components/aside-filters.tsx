import { cn } from "@/lib/utils";
import Labels from "./labels";
import MyIssueOnlySwitcher from "./my-issue-only-switcher";
import Status from "./status";

export default function AsideFilters({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <h1 className="text-xl mb-4">Filter By</h1>
      <MyIssueOnlySwitcher />

      <h1 className="text-sm mb-4">Labels</h1>
      <Labels />
      <h1 className="text-sm mb-4">Status</h1>
      <Status />
    </div>
  );
}
