import { fetchWithHeaders } from "@/lib/utils";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Comment, IssueCommentsType } from "./useIssue";
import { useUser } from "@clerk/clerk-react";
import { useCommentStore } from "@/stores/comment";

interface IssueCommentsUpdateData {
  body: string;
  owner: string;
  repoName: string;
  number: number;
  token: string;
}

async function addIssueComment(data: IssueCommentsUpdateData) {
  const { body, owner, repoName, number, token } = data;
  const res = await fetchWithHeaders(
    `/repos/${owner}/${repoName}/issues/${number}/comments`,
    token,
    {
      method: "POST",
      body: JSON.stringify({ body }),
    }
  );
  return res;
}

export function useAddIssueComment(
  data: IssueCommentsUpdateData,
  queryClient: QueryClient
) {
  const { number, body } = data;
  const { user } = useUser();
  const queryKey = ["issueComments", { issueId: number.toString() }];
  const setCommentTextarea = useCommentStore((state) => state.setBody);
  return useMutation(() => addIssueComment(data), {
    mutationKey: ["issue", "comment"],
    onMutate: () => {
      const comment = {
        id: Math.random(),
        body: body,
        node_id: "test",
        url: "test",
        html_url: "test",
        created_at: "test",
        user: {
          login: user?.username ?? "user",
          id: 0,
          node_id: "",
          avatar_url: user?.profileImageUrl ?? "",
          gravatar_id: "",
          url: "",
          html_url: "",
          followers_url: "",
          following_url: "",
          gists_url: "",
          starred_url: "",
          subscriptions_url: "",
          organizations_url: "",
          repos_url: "",
          events_url: "",
          received_events_url: "",
          type: "",
          site_admin: false,
        },
        issue_url: "test",
        updated_at: "",
        author_association: "",
        performed_via_github_app: null,
        reactions: {
          url: "",
          total_count: 0,
          "+1": 0,
          "-1": 0,
          laugh: 0,
          hooray: 0,
          confused: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        },
      } satisfies Comment;

      const savedCache = queryClient.getQueryData<IssueCommentsType>(queryKey);
      if (savedCache) {
        queryClient.setQueryData<IssueCommentsType>(queryKey, (old) => {
          if (old) {
            return old.concat(comment);
          }
        });
      }
      return () => {
        queryClient.setQueryData(queryKey, savedCache);
      };
    },
    onSuccess: (data, _variables, restoreCache) => {
      // real data comes from the server
      if (restoreCache) restoreCache();
      queryClient.setQueryData<IssueCommentsType>(queryKey, (comments) =>
        comments?.concat(data)
      );
      setCommentTextarea("");
    },
    onError: (_err, _data, restoreCache) => {
      if (restoreCache) restoreCache();
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
}
