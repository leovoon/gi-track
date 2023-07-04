import StateIcon from "@/components/state-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIssue } from "@/hooks/useIssue";
import { GithubError, cn, getLabelColor } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import SkeletonComments from "@/components/skeleton-comments";
import SkeletonIssue from "@/components/skeleton-issue";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import IssueTitle from "@/components/issue-title";
import { IssueTitleUpdateProvider } from "@/stores/issue-title";
import { IssueStatusUpdate } from "@/components/status-update";
import { IssueComments } from "@/components/issue-comments";
import AddIssueCommentForm from "@/components/add-issue-comment-form";

export default function IssuePage() {
  const params = useParams<{
    repoUsername: string;
    repoName: string;
    issueId: string;
  }>();

  const { repoName } = params;

  const queryClient = useQueryClient();
  const { issueQuery, issueCommentsQuery } = useIssue(params, queryClient);

  const { data: issue } = issueQuery;
  const comments = issueCommentsQuery.data;
  const { user } = useUser();

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
            issue && (
              <>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "flex items-center space-x-2 w-max py-1 px-2 rounded-full text-xs font-thin",
                      {
                        "bg-green-300 dark:bg-green-800":
                          issue.state === "open",
                        "bg-purple-300 dark:bg-purple-800":
                          issue.state === "closed",
                      }
                    )}
                  >
                    <StateIcon
                      state={issue.state}
                      size={15}
                      className={
                        issue.state === "open"
                          ? "dark:text-green-200"
                          : "dark:text-purple-200"
                      }
                    />
                    <span>{issue.state}</span>
                  </div>
                  <IssueTitleUpdateProvider title={issue.title}>
                    <IssueTitle
                      html_url={issue.html_url}
                      title={issue.title}
                      number={issue.number}
                      owner={issue.user.login}
                      repoName={repoName!}
                    />
                  </IssueTitleUpdateProvider>
                  <div className="space-y-2">
                    {issue.labels.length > 0 && (
                      <ul className="flex gap-1 flex-wrap">
                        {issue.labels.map((label) => (
                          <Badge
                            key={label.id}
                            variant={getLabelColor(label.name)}
                          >
                            {label.name}
                          </Badge>
                        ))}
                      </ul>
                    )}
                    <p className="text-xs sm:text-sm text-muted-foreground space-x-1">
                      <span>
                        {issue.user.login === user?.username
                          ? "You"
                          : issue.user.login}{" "}
                        opened this issue{" "}
                        <TimeAgo datetime={issue.created_at} />
                      </span>
                      <span>·</span>
                      <span className="inline-flex space-x-1">
                        <span>{issue.comments}</span>
                        <span>
                          {issue.comments > 1 ? "comments" : "comment"}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )
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
            comments && (
              <>
                <IssueComments comments={comments} />
                {issue && repoName && (
                  <AddIssueCommentForm
                    owner={issue.user.login}
                    repoName={repoName}
                    number={issue.number}
                  />
                )}
              </>
            )
          )}
        </section>
        {issueQuery.isSuccess && repoName && issue && (
          <aside className="hidden sm:block sm:w-1/3 order-1 p-2 space-y-4">
            <IssueStatusUpdate
              status={issue.state}
              number={issue.number}
              owner={issue.user.login}
              repoName={repoName}
            />
          </aside>
        )}
      </main>
    </div>
  );
}
