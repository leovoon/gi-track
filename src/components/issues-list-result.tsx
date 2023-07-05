import { Issues, Issue } from "@/hooks/useIssues";
import { IssueItem } from "./issue-item";

export default function IssuesListResult({ data }: { data: Issues }) {
  return (
    <div className="space-y-4">
      <ResultCount count={data.total_count} />
      {data.message ? (
        <p className="text-gray-500">{data.message}</p>
      ) : data.items && data.items.length > 0 ? (
        data.items.map((issue: Issue) => (
          <IssueItem key={issue.id} {...issue} />
        ))
      ) : (
        <div className="text-center">
          <p className="text-gray-500">No issues found</p>
        </div>
      )}
    </div>
  );
}

function ResultCount({ count }: { count: number }) {
  return <p className="text-sm mb-2 text-muted-foreground">{count} Results</p>;
}
