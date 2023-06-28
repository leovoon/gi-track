import { useIssues } from "@/hooks/useIssues";
import { useContext, useState } from "react";
import { selectedLabelContext } from "@/contexts/labelsContext";
import { statusContext } from "@/contexts/statusContext";
import SkeletonIssues from "./skeleton-issues";
import IssuesListResult from "./issues-list-result";
import { searchContext } from "@/contexts/searchContext";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import IssuesSearchForm from "./issues-search-form";

export default function IssuesList() {
  const [isMe, setIsMe] = useState(true);
  const selectedLabel = useContext(selectedLabelContext);
  const { status: selectedStatus } = useContext(statusContext);
  const { search } = useContext(searchContext);
  const issuesQuery = useIssues(selectedLabel, selectedStatus);
  const searchIssuesQuery = useIssues(
    selectedLabel,
    selectedStatus,
    isMe,
    search
  );

  // console.log(issuesQuery.data);
  // When cache is empty, when page is refreshed, fetchStatus is "idle" and isLoading is true
  // if (issuesQuery.fetchStatus === "idle" && issuesQuery.isLoading)

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="my-issue"
          checked={isMe}
          onCheckedChange={() => {
            setIsMe(!isMe);
          }}
        />
        <Label htmlFor="my-issue">My Issues only</Label>
      </div>
      <IssuesSearchForm />
      {issuesQuery.isLoading ? (
        <SkeletonIssues />
      ) : issuesQuery.isError ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-gray-500">Something went wrong</p>
        </div>
      ) : searchIssuesQuery.fetchStatus === "idle" &&
        searchIssuesQuery.isLoading ? (
        <IssuesListResult data={issuesQuery.data} />
      ) : (
        <>
          <h2 className="mt-6 mb-2">Search Results</h2>
          {searchIssuesQuery.isLoading ? (
            <SkeletonIssues />
          ) : searchIssuesQuery.isError ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold">Error</h1>
              <p className="text-gray-500">Something went wrong</p>
            </div>
          ) : (
            <>
              <p className="text-sm mb-2 text-muted-foreground">
                {searchIssuesQuery.data.total_count} Results
              </p>
              <IssuesListResult data={searchIssuesQuery.data} />
            </>
          )}
        </>
      )}
    </>
  );
}
