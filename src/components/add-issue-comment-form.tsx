import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAddIssueComment } from "@/hooks/useAddIssueComment";
import { useToken } from "@/hooks/useAccessToken";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useCommentStore } from "@/stores/comment";
import { useRef } from "react";

export default function AddIssueCommentForm({
  owner,
  repoName,
  number,
}: {
  owner: string;
  repoName: string;
  number: number;
}) {
  const [comment, setComment] = useCommentStore((state) => [
    state.body,
    state.setBody,
  ]);
  const ref = useRef(null);
  const token = useToken();
  const queryClient = useQueryClient();
  const data = { body: comment, owner, repoName, number, token };
  const addComment = useAddIssueComment(data, queryClient);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addComment.mutate();
    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(function () {
      if (!ref.current) return;
      (ref.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid w-full gap-2 my-4">
        <Textarea
          required
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setComment(e.target.value);
          }}
          placeholder="Type your comment here."
        />
        <Button type="submit" disabled={addComment.isLoading}>
          {addComment.isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Adding comment...
            </>
          ) : (
            "Add comment"
          )}
        </Button>
      </form>
      <div ref={ref}></div>
    </>
  );
}
