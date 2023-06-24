import { IssueItem, useIssues } from "@/hooks/useIssues";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import TimeAgo from "timeago-react";
import { BadgeAlert, MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export default function IssuesList() {
  const issues = useIssues();

  console.log(issues.data);
  return issues.isLoading ? (
    <>
      {Array.from(Array(7), (_, i) => (
        <div
          key={i}
          className="grid grid-cols-8 sm:grid-cols-9 gap-4 mt-6 space-y-4"
        >
          <div className="col-span-1 grid place-items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="col-span-7 sm:col-span-6 space-y-4">
            <Skeleton className="h-4 w-[200px] sm:w-[500px] " />
            <Skeleton className="h-4 w-[100px] sm:w-[300px] " />
          </div>
          <div className="col-span-8 sm:col-span-2 grid place-items-end sm:place-items-center">
            <div className="flex gap-2 justify-start items-center p-2">
              <Skeleton className="h-4 w-5 " />
              <Skeleton className="h-4 w-5 rounded-full" />
              <Skeleton className="h-4 w-5 " />
            </div>
          </div>
        </div>
      ))}
    </>
  ) : (
    <div className="space-y-4 mt-4">
      {issues.data?.items.map((issue: IssueItem) => (
        <Card className="grid grid-cols-8 sm:grid-cols-9">
          <div className="col-span-1 -mr-6  grid place-items-center">
            <BadgeAlert />
          </div>
          <div className="col-span-7 sm:col-span-7">
            <CardHeader>
              <CardTitle>{issue.title}</CardTitle>
            </CardHeader>
            <CardDescription>
              <div className="ml-6 pb-4">
                {`#${issue.id} `.slice(0, 3)} opened{" "}
                <TimeAgo datetime={issue.created_at} />
                {"  "}
                by {issue.user.login}
              </div>
            </CardDescription>
          </div>
          <div className="col-span-8 sm:col-span-1 grid place-items-end sm:place-items-center">
            <div className="flex gap-2 justify-start items-center p-2">
              <MessageSquare size="20" strokeWidth={2} />
              {issue.user.avatar_url && (
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={issue.user.avatar_url}
                    alt={issue.user.login}
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="text-sm">{issue.comments}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
