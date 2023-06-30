import { useIssues, useSearchGlobalIssues } from "@/hooks/useIssues";
import { useContext, useState } from "react";
import { selectedLabelContext } from "@/contexts/labelsContext";
import { statusContext } from "@/contexts/statusContext";
import SkeletonIssues from "./skeleton-issues";
import IssuesListResult from "./issues-list-result";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import IssuesSearchForm from "./issues-search-form";
import { searchGlobalContext } from "@/contexts/searchGlobalContext";
import { searchOwnContext } from "@/contexts/searchOwnContext";
import { useQueryClient } from "@tanstack/react-query";

export default function IssuesList() {
  const [myIssueOnly, setMyIssueOnly] = useState(true);
  const selectedLabel = useContext(selectedLabelContext);
  const { status: selectedStatus } = useContext(statusContext);
  const { searchGlobalTerm } = useContext(searchGlobalContext);
  const { searchOwnTerm } = useContext(searchOwnContext);
  const queryClient = useQueryClient();

  const issuesQuery = useIssues(
    searchOwnTerm,
    selectedLabel,
    selectedStatus,
    myIssueOnly,
    queryClient
  );
  const searchIssuesQuery = useSearchGlobalIssues(
    searchGlobalTerm,
    selectedLabel,
    selectedStatus,
    myIssueOnly
  );

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="my-issue"
          checked={myIssueOnly}
          onCheckedChange={() => {
            setMyIssueOnly(!myIssueOnly);
          }}
        />
        <Label htmlFor="my-issue">My Issues only</Label>
      </div>
      <IssuesSearchForm myIssueOnly={myIssueOnly} />
      {issuesQuery.fetchStatus === "idle" && issuesQuery.isLoading ? (
        searchIssuesQuery.isLoading ? (
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
        )
      ) : searchIssuesQuery.fetchStatus === "idle" &&
        searchIssuesQuery.isLoading ? (
        issuesQuery.isLoading ? (
          <SkeletonIssues />
        ) : issuesQuery.isError ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-gray-500">Something went wrong</p>
          </div>
        ) : (
          <>
            <p className="text-sm mb-2 text-muted-foreground">
              {issuesQuery.data.total_count} Results
            </p>{" "}
            <IssuesListResult data={issuesQuery.data} />
          </>
        )
      ) : null}
    </>
  );
}
