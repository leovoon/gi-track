import StateIcon from "@/components/state-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIssue } from "@/hooks/useIssue";
import { cn, getLabelColor } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-select";
import { ChevronLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import snarkdown from "snarkdown";

export default function IssuePage() {
  const params = useParams<{
    repoUsername?: string;
    repoName?: string;
    issueId?: string;
  }>();

  const { issueQuery, issueCommentsQuery } = useIssue(params);

  const issue = issueQuery.data;
  const comments = issueCommentsQuery.data;

  return (
    <div className="mt-4 p-2 space-y-6 sm:space-y-10">
      <Button asChild variant="outline" size="sm">
        <Link to="/">
          <ChevronLeftIcon className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:block">back to Issues List</span>
        </Link>
      </Button>

      {issueQuery.isLoading ? (
        <div>Loading issue...</div>
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
                  "bg-purple-300 dark:bg-purple-800": issue.state === "closed",
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
              <p className="text-xs sm:text-sm text-muted-foreground">
                {issue.author_association === "OWNER" ? "You" : "Someone"}{" "}
                opened this issue <TimeAgo datetime={issue.created_at} />{" "}
                {issue.comments} · {issue.comments > 1 ? "comments" : "comment"}
              </p>
            </div>
          </div>
        )
      )}

      <Separator className="my-4" />

      {issueCommentsQuery.isLoading ? (
        <div>Loading comments..</div>
      ) : issueCommentsQuery.isError ? (
        <div>Error loading comments</div>
      ) : (
        comments && (
          <ul className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li key={comment.id} className="flex gap-2">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage
                      className="rounded-full aspect-square h-full w-full"
                      src={comment.user.avatar_url}
                      alt={comment.user.login}
                    />
                    <AvatarFallback>{comment.user.login[0]}</AvatarFallback>
                  </Avatar>
                  <div className="w-full border">
                    <div className="space-x-2 p-2 border-b bg-muted">
                      <span className="font-medium text-sm sm:text-base">
                        {comment.user.login}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        commented
                      </span>
                      <TimeAgo
                        datetime={comment.created_at}
                        className="text-xs sm:text-sm text-muted-foreground"
                      />
                    </div>
                    <p
                      className="p-2"
                      dangerouslySetInnerHTML={{
                        __html: snarkdown(comment.body),
                      }}
                    ></p>
                  </div>
                </li>
              ))
            ) : (
              <div>No comments</div>
            )}
          </ul>
        )
      )}
    </div>
  );
}
