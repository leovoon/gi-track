import { useIssues, useSearchGlobalIssues } from "@/hooks/useIssues";
import SkeletonIssues from "./skeleton-issues";
import IssuesListResult from "./issues-list-result";
import IssuesSearchForm from "./issues-search-form";
import { useQueryClient } from "@tanstack/react-query";
import { useStatusStore } from "@/stores/status";
import { useLabelStore } from "@/stores/label";
import { useGlobalSearchStore, useSelfSearchStore } from "@/stores/search";
import { useOwnerStore } from "@/stores/owner";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function IssuesList() {
  const myIssuesOnly = useOwnerStore((state) => state.isOwner);
  const selectedLabel = useLabelStore((state) => state.label);
  const selectedStatus = useStatusStore((state) => state.status);
  const searchGlobalTerm = useGlobalSearchStore((state) => state.globalSearch);
  const searchOwnTerm = useSelfSearchStore((state) => state.selfSearch);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const issuesQuery = useIssues(
    searchOwnTerm,
    selectedLabel,
    selectedStatus,
    myIssuesOnly,
    queryClient,
    page,
    5
  );
  const globalIssuesQuery = useSearchGlobalIssues(
    searchGlobalTerm,
    selectedLabel,
    selectedStatus,
    myIssuesOnly,
    queryClient
  );

  return (
    <>
      <IssuesSearchForm myIssuesOnly={myIssuesOnly} />
      {issuesQuery.fetchStatus === "idle" && issuesQuery.isLoading ? (
        globalIssuesQuery.isLoading ? (
          <SkeletonIssues />
        ) : globalIssuesQuery.isError ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-gray-500">Something went wrong</p>
          </div>
        ) : (
          <>
            <p className="text-sm mb-2 text-muted-foreground">
              {globalIssuesQuery.data.total_count} Results
            </p>
            <IssuesListResult data={globalIssuesQuery.data} />
          </>
        )
      ) : globalIssuesQuery.fetchStatus === "idle" &&
        globalIssuesQuery.isLoading ? (
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
            <div className="grid grid-cols-3 items-center my-10">
              <Button
                variant="outline"
                size="default"
                disabled={page === 1}
                onClick={() => setPage((page) => page - 1)}
              >
                <ChevronLeft size={16} />
                <span className="ml-2">Previous</span>
              </Button>
              <p className="text-center">
                Page {page} {issuesQuery.isFetching ? <span>...</span> : ""}
              </p>
              <Button
                variant="outline"
                size="default"
                onClick={() => setPage((page) => page + 1)}
                disabled={issuesQuery.data.items.length < 5}
              >
                <ChevronRight size={16} />
                <span className="ml-2">Next</span>
              </Button>
            </div>
          </>
        )
      ) : null}
    </>
  );
}
