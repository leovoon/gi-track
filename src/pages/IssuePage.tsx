import { Button } from "@/components/ui/button";
import { useIssue } from "@/hooks/useIssue";
import { GithubError } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SkeletonComments from "@/components/skeleton-comments";
import SkeletonIssue from "@/components/skeleton-issue";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { IssueStatusUpdate } from "@/components/status-update";
import { IssueComments } from "@/components/issue-comments";
import AddIssueCommentForm from "@/components/add-issue-comment-form";
import Issue from "@/components/issue";

export default function IssuePage() {
  const params = useParams<{
    repoUsername: string;
    repoName: string;
    issueId: string;
  }>();

  const { repoName } = params;

  if (!repoName) {
    throw new Error("Repo name is required.");
  }

  const queryClient = useQueryClient();
  const { issueQuery, issueCommentsQuery } = useIssue(params, queryClient);
  const { user } = useUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="mt-4 p-2 space-y-6 sm:space-y-10">
      <Button asChild variant="outline" size="sm">
        <Link to="/">
          <ChevronLeftIcon className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:block">back to Issues List</span>
        </Link>
      </Button>
      <main className="space-y-6 sm:flex sm:gap-4">
        <section className="flex-grow">
          {issueQuery.isLoading ? (
            <SkeletonIssue />
          ) : issueQuery.isError ? (
            <div>
              {(issueQuery.error as GithubError).message ??
                "Error fetching issue"}
            </div>
          ) : (
            <Issue issue={issueQuery.data} repoName={repoName} user={user} />
          )}

          <Separator className="my-4" />

          {issueCommentsQuery.isLoading ? (
            <SkeletonComments />
          ) : issueCommentsQuery.isError ? (
            <div>
              {(issueCommentsQuery.error as GithubError).message ??
                "Error loading comments."}
            </div>
          ) : (
            <>
              <IssueComments comments={issueCommentsQuery.data} />

              {issueQuery.isSuccess && (
                <AddIssueCommentForm
                  owner={issueQuery.data.user.login}
                  repoName={repoName}
                  number={issueQuery.data.number}
                />
              )}
            </>
          )}
        </section>
        {issueQuery.isSuccess &&
          issueQuery.data.user.login === user.username && (
            <aside className="hidden sm:block sm:w-1/3 order-1 p-2 space-y-4">
              <IssueStatusUpdate
                status={issueQuery.data.state}
                number={issueQuery.data.number}
                owner={issueQuery.data.user.login}
                repoName={repoName}
              />
            </aside>
          )}
      </main>
    </div>
  );
}
