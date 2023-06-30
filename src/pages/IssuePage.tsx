import StateIcon from "@/components/state-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIssue } from "@/hooks/useIssue";
import { cn, getLabelColor } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import CommentItem from "@/components/comment-item";
import SkeletonComments from "@/components/skeleton-comments";
import SkeletonIssue from "@/components/skeleton-issue";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";

export default function IssuePage() {
  const params = useParams<{
    repoUsername?: string;
    repoName?: string;
    issueId?: string;
  }>();

  const queryClient = useQueryClient();
  const { issueQuery, issueCommentsQuery } = useIssue(params, queryClient);

  const issue = issueQuery.data;
  const comments = issueCommentsQuery.data;

  return (
    <main className="mt-4 p-2 space-y-6 sm:space-y-10">
      <Button asChild variant="outline" size="sm">
        <Link to="/">
          <ChevronLeftIcon className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:block">back to Issues List</span>
        </Link>
      </Button>

      <section>
        {issueQuery.isLoading ? (
          <SkeletonIssue />
        ) : issueQuery.isError ? (
          <div>Error loading issue</div>
        ) : (
          issue && (
            <div className="space-y-2">
              <div
                className={cn(
                  "flex items-center space-x-2 w-max py-1 px-2 rounded-full text-xs font-thin",
                  {
                    "bg-green-300 dark:bg-green-800": issue.state === "open",
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
              <h1 className="text-lg sm:text-2xl font-bold ">
                <span>{issue.title}</span>{" "}
                <span className="text-muted-foreground">#{issue.number}</span>
              </h1>
              <div className="space-y-2">
                {issue.labels.length > 0 && (
                  <ul className="flex gap-1 flex-wrap">
                    {issue.labels.map((label) => (
                      <Badge key={label.id} variant={getLabelColor(label.name)}>
                        {label.name}
                      </Badge>
                    ))}
                  </ul>
                )}
                <p className="text-xs sm:text-sm text-muted-foreground space-x-1">
                  <span>
                    You opened this issue{" "}
                    <TimeAgo datetime={issue.created_at} />
                  </span>
                  <span>·</span>
                  <span className="inline-flex space-x-1">
                    <span>{issue.comments}</span>
                    <span>{issue.comments > 1 ? "comments" : "comment"}</span>
                  </span>
                </p>
              </div>
            </div>
          )
        )}

        <Separator className="my-4" />

        {issueCommentsQuery.isLoading ? (
          <SkeletonComments />
        ) : issueCommentsQuery.isError ? (
          <div>Error loading comments</div>
        ) : (
          comments && (
            <ul className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentItem key={comment.id} {...comment} />
                ))
              ) : (
                <div>No comments</div>
              )}
            </ul>
          )
        )}
      </section>
    </main>
  );
}
