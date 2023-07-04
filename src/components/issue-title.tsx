import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useToken } from "@/hooks/useAccessToken";
import { useUpdateIssueTitle } from "@/hooks/useUpdateIssueTitle";
import { useUpdateIssueTitleContext } from "@/stores/issue-title";

export default function IssueTitle({
  title,
  number,
  owner,
  repoName,
}: {
  title: string;
  number: number;
  owner: string;
  repoName: string;
}) {
  const [isEditing, setIsEditing] = useUpdateIssueTitleContext((state) => [
    state.isEditing,
    state.setIsEditing,
  ]);
  const [draft, setDraft] = useUpdateIssueTitleContext((state) => [
    state.title,
    state.setTitle,
  ]);

  const token = useToken();
  const queryClient = useQueryClient();
  const data = { owner, repoName, number, title: draft, token };
  const updateTitle = useUpdateIssueTitle(data, queryClient);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (draft === title) return;
    if (updateTitle.isLoading) return;
    updateTitle.mutate(draft);
  }

  const handleCancel = () => {
    if (updateTitle.isLoading) {
      updateTitle.mutate(draft);
    }
    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-lg sm:text-2xl font-bold flex justify-between items-center"
    >
      {isEditing ? (
        <div className="flex-grow">
          <Label htmlFor="title" />
          <Input
            type="text"
            name="title"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full sm:text-xl text-lg"
            autoFocus={isEditing}
          />
        </div>
      ) : (
        <div>
          <h1 className="inline">{title}</h1>{" "}
          <span className="text-muted-foreground">#{number}</span>
        </div>
      )}
      <div>
        {isEditing ? (
          <div className="flex">
            <Button
              variant="link"
              size="sm"
              type="submit"
              disabled={updateTitle.isLoading}
            >
              {updateTitle.isLoading ? "Updating..." : "Save"}
            </Button>
            <Button
              variant="link"
              className="font-semibold"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
    </form>
  );
}
