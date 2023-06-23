import { useIssues } from "@/hooks/useIssues";

export default function IssuesList() {
  const issues = useIssues();

  if (issues.isLoading) return <div>Loading...</div>;

  return <pre>{JSON.stringify(issues.data, null, 4)}</pre>;
}
