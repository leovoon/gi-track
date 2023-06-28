import { Comment } from "@/hooks/useIssue";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import TimeAgo from "timeago-react";
import snarkdown from "snarkdown";

export default function CommentItem({ user, id, created_at, body }: Comment) {
  return (
    <li key={id} className="flex gap-2">
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
        <AvatarImage
          className="rounded-full aspect-square h-full w-full"
          src={user.avatar_url}
          alt={user.login}
        />
        <AvatarFallback>{user.login[0]}</AvatarFallback>
      </Avatar>
      <div className="w-full border">
        <div className="space-x-2 p-2 border-b bg-muted">
          <span className="font-semibold text-sm sm:text-base">
            {user.login}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            commented
          </span>
          <TimeAgo
            datetime={created_at}
            className="text-xs sm:text-sm text-muted-foreground"
          />
        </div>
        <div
          className="p-2 font-normal text-sm sm:text-base dark:text-foreground/80 break-words"
          dangerouslySetInnerHTML={{
            __html: snarkdown(body),
          }}
        ></div>
      </div>
    </li>
  );
}
