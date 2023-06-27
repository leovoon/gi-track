import StateIcon from "@/components/state-icon";
import { Button } from "@/components/ui/button";
import { useIssue } from "@/hooks/useIssue";
import { cn } from "@/lib/utils";
import { Badge, ChevronLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";

export default function IssuePage() {
  const params = useParams<{
    repoUsername?: string;
    repoName?: string;
    issueId?: string;
  }>();

  const issueQuery = useIssue(params);

  if (issueQuery.isLoading) return <div>Loading...</div>;

  if (issueQuery.isError) return <div>Error</div>;

  const issue = issueQuery.data;

  return (
    <div className="p-2 space-y-6 sm:space-y-10">
      <Button asChild variant="outline" size="sm">
        <Link to="/">
          <ChevronLeftIcon className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:block">back to Issues List</span>
        </Link>
      </Button>
      <div className="space-y-2">
        <h1 className="text-lg sm:text-2xl font-bold ">
          <span>{issue.title}</span>{" "}
          <span className="text-muted-foreground">#{issue.number}</span>
        </h1>
        <div className="space-y-2">
          <div
            className={cn(
              "flex items-center space-x-2 w-max py-0.5 px-2 rounded-full text-xs font-thin",
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
          <p className="text-sm text-muted-foreground">
            {issue.author_association === "OWNER" ? "You" : "Someone"} opened
            this issue <TimeAgo datetime={issue.created_at} /> {issue.comments}{" "}
            · {issue.comments > 1 ? "comments" : "comment"}
          </p>
        </div>
      </div>
    </div>
  );
}
