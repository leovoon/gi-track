import { useIssues, useSearchGlobalIssues } from "@/hooks/useIssues";
import SkeletonIssues from "./skeleton-issues";
import IssuesListResult from "./issues-list-result";
import IssuesSearchForm from "./issues-search-form";
import { useQueryClient } from "@tanstack/react-query";
import { useStatusStore } from "@/stores/status";
import { useLabelStore } from "@/stores/label";
import { useGlobalSearchStore, useSelfSearchStore } from "@/stores/search";
import { useOwnerStore } from "@/stores/owner";

export default function IssuesList() {
  const myIssueOnly = useOwnerStore((state) => state.isOwner);
  const selectedLabel = useLabelStore((state) => state.label);
  const selectedStatus = useStatusStore((state) => state.status);
  const searchGlobalTerm = useGlobalSearchStore((state) => state.globalSearch);
  const searchOwnTerm = useSelfSearchStore((state) => state.selfSearch);
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
    myIssueOnly,
    queryClient
  );

  return (
    <>
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
