import { Issue } from "@/hooks/useIssues";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import TimeAgo from "timeago-react";
import { MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useMemo } from "react";
import { cn, getLabelColor } from "@/lib/utils";
import { Link } from "react-router-dom";
import StateIcon from "./state-icon";

export function IssueItem({
  id,
  title,
  user,
  created_at,
  comments,
  labels,
  repository_url,
  state,
  number,
  assignees,
}: Issue) {
  const { repoName, repoUsername } = useMemo(() => {
    const repo = repository_url.split("/");
    const repoName = repo[repo.length - 1];
    const repoUsername = repo[repo.length - 2];
    return {
      repoName,
      repoUsername,
    };
  }, [repository_url]);

  return (
    <Card className="grid grid-cols-8 md:grid-cols-12">
      <div className="col-span-1 -mr-6  grid place-items-center">
        <StateIcon state={state} />
      </div>
      <div className="col-span-7 md:col-span-9">
        <CardHeader>
          <CardTitle className="leading-6 group">
            <Link to={`/issue/${repoUsername}/${repoName}/${number}`}>
              <span className="text-muted-foreground/50">{repoName}</span>{" "}
              <span className="group-hover:text-muted-foreground">{title}</span>
              <div className="flex flex-wrap gap-1">
                {labels.map((label) => (
                  <Badge key={label.id} variant={getLabelColor(label.name)}>
                    {label.name}
                  </Badge>
                ))}
              </div>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardDescription className="ml-6 pb-4 text-xs md:text-sm">
          {`#${id} `.slice(0, 3)} opened <TimeAgo datetime={created_at} />
          {"  "}
          by {user.login}
        </CardDescription>
      </div>
      <div className="col-span-8 md:col-span-2 grid place-items-end md:place-items-center">
        <div className="flex gap-2 justify-start items-center p-2">
          {assignees && (
            <div
              className={cn("flex -space-x-1", {
                "-space-x-3": assignees.length > 2,
                "-space-x-4": assignees.length > 5,
              })}
            >
              {assignees.map((assignee) => (
                <Avatar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 ">
                  <AvatarImage
                    className="aspect-square w-full h-full"
                    src={assignee.avatar_url}
                    alt={assignee.login}
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
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
