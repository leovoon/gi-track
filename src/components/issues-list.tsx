import { useIssues, useSearchGlobalIssues } from "@/hooks/useIssues";
import SkeletonIssues from "./skeleton-issues";
import IssuesListResult from "./issues-list-result";
import IssuesSearchForm from "./issues-search-form";
import { useQueryClient } from "@tanstack/react-query";
import { useStatusStore } from "@/stores/status";
import { useLabelStore } from "@/stores/label";
import { useGlobalSearchStore, useSelfSearchStore } from "@/stores/search";
import { useOwnerStore } from "@/stores/owner";
import { usePaginationStore } from "@/stores/pagination";
import Pagination from "./pagination-button";
import { Button } from "./ui/button";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function IssuesList() {
  const myIssuesOnly = useOwnerStore((state) => state.isOwner);
  const selectedLabel = useLabelStore((state) => state.label);
  const selectedStatus = useStatusStore((state) => state.status);
  const searchGlobalTerm = useGlobalSearchStore((state) => state.globalSearch);
  const searchOwnTerm = useSelfSearchStore((state) => state.selfSearch);
  const queryClient = useQueryClient();
  const [page, per_page] = usePaginationStore((state) => [
    state.page,
    state.per_page,
  ]);

  const issuesQuery = useIssues(
    searchOwnTerm,
    selectedLabel,
    selectedStatus,
    myIssuesOnly,
    queryClient,
    page,
    per_page
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
      {myIssuesOnly ? (
        issuesQuery.isLoading ? (
          <SkeletonIssues />
        ) : issuesQuery.isError ? (
          <Error />
        ) : (
          <>
            <IssuesListResult data={issuesQuery.data} />
            <Pagination
              itemsLength={issuesQuery.data.items.length}
              isFetching={issuesQuery.isFetching}
              isPreviousData={issuesQuery.isPreviousData}
            />
          </>
        )
      ) : globalIssuesQuery.isLoading ? (
        <SkeletonIssues />
      ) : globalIssuesQuery.isError ? (
        <Error />
      ) : (
        <>
          {globalIssuesQuery.data.pages.map((page, i) => (
            <React.Fragment key={i}>
              <IssuesListResult data={page} />
            </React.Fragment>
          ))}
          {globalIssuesQuery.isFetchingNextPage && <SkeletonIssues rows={3} />}
          <div className="flex justify-center">
            <Button
              className="mt-4 mb-6"
              disabled={
                !globalIssuesQuery.hasNextPage ||
                globalIssuesQuery.isFetchingNextPage
              }
              onClick={() => globalIssuesQuery.fetchNextPage()}
            >
              {globalIssuesQuery.isFetchingNextPage ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <div>Load More</div>
              )}
            </Button>
          </div>
        </>
      )}
    </>
  );
}

function Error() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-gray-500">Something went wrong</p>
    </div>
  );
}
