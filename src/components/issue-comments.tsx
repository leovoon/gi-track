import { IssueCommentsType } from "@/hooks/useIssue";
import CommentItem from "./comment-item";

export function IssueComments({ comments }: { comments: IssueCommentsType }) {
  return (
    <ul className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => <CommentItem key={comment.id} {...comment} />)
      ) : (
        <div>No comments</div>
      )}
    </ul>
  );
}
