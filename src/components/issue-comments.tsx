import { IssueCommentsType } from "@/hooks/useIssue";
import CommentItem from "./comment-item";

export function IssueComments({ comments }: { comments: IssueCommentsType }) {
  return (
    <ul className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => <CommentItem key={comment.id} {...comment} />)
      ) : (
        <p className="text-muted-foreground text-sm h-20 grid place-items-center">
          No comments
        </p>
      )}
    </ul>
  );
}
