import { Issue } from "@/hooks/useIssues";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import TimeAgo from "timeago-react";
import { BadgeAlert, MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useMemo } from "react";

export function IssueItem({
  id,
  title,
  user,
  created_at,
  comments,
  assignee,
  labels,
  repository_url,
}: Issue) {
  const repoName = useMemo(() => {
    const repo = repository_url.split("/");
    const repoWithGit = repo[repo.length - 1];
    return repoWithGit.replace("-git", "");
  }, [repository_url]);

  return (
    <Card className="grid grid-cols-8 sm:grid-cols-9">
      <div className="col-span-1 -mr-6  grid place-items-center">
        <BadgeAlert />
      </div>
      <div className="col-span-7 sm:col-span-7">
        <CardHeader>
          <CardTitle className="leading-6">
            <span className="text-muted-foreground">{repoName}</span> {title}
            <div className="space-x-1">
              {labels.map((label) => (
                <Badge
                  key={label.id}
                  variant={
                    label.name === "bug"
                      ? "reddish"
                      : label.name === "documentation"
                      ? "bluish"
                      : label.name === "enhancement"
                      ? "cyan"
                      : label.name === "duplicate"
                      ? "zinc"
                      : label.name === "good first issue"
                      ? "purple"
                      : label.name === "help wanted"
                      ? "teal"
                      : label.name === "invalid"
                      ? "yellow"
                      : label.name === "question"
                      ? "violet"
                      : label.name === "wontfix"
                      ? "stone"
                      : "secondary"
                  }
                  color={label.color}
                >
                  {label.name}
                </Badge>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardDescription className="ml-6 pb-4 text-xs sm:text-sm">
          {`#${id} `.slice(0, 3)} opened <TimeAgo datetime={created_at} />
          {"  "}
          by {user.login}
        </CardDescription>
      </div>
      <div className="col-span-8 sm:col-span-1 grid place-items-end sm:place-items-center">
        <div className="flex gap-2 justify-start items-center p-2">
          {assignee && (
            <Avatar className="w-6 h-6">
              <AvatarImage src={assignee.avatar_url} alt={assignee.login} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          )}
          {comments > 0 && (
            <div className="text-sm flex gap-2">
              <MessageSquare size="20" strokeWidth={2} />
              {comments}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
