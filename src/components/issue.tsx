import { Label, IssueType } from "@/hooks/useIssue";
import StateIcon from "./state-icon";
import { IssueTitleUpdateProvider } from "@/stores/issue-title";
import { Badge } from "./ui/badge";
import TimeAgo from "timeago-react";
import { cn, getLabelColor } from "@/lib/utils";
import IssueTitle from "./issue-title";
import { WithUserProp } from "@clerk/clerk-react";

export default function Issue({
  issue,
  repoName,
  user,
}: {
  issue: IssueType;
  repoName: string;
  user: WithUserProp["user"];
}) {
  return (
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
            {issue.labels.map((label: Label) => (
              <Badge key={label.id} variant={getLabelColor(label.name)}>
                {label.name}
              </Badge>
            ))}
          </ul>
        )}
        <p className="text-xs sm:text-sm text-muted-foreground space-x-1">
          <span>
            {issue.user.login === user?.username ? "You" : issue.user.login}{" "}
            opened this issue <TimeAgo datetime={issue.created_at} />
          </span>
          <span>·</span>
          <span className="inline-flex space-x-1">
            <span>{issue.comments}</span>
            <span>{issue.comments > 1 ? "comments" : "comment"}</span>
          </span>
        </p>
      </div>
    </div>
  );
}
