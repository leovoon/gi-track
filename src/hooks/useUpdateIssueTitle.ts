import { fetchWithHeaders } from "@/lib/utils";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Issue } from "./useIssue";
import { useUpdateIssueTitleContext } from "@/stores/issue-title";

interface IssueTitleUpdateData {
  title: string;
  owner: string;
  repoName: string;
  number: number;
  token: string;
}

async function updateIssueTitle(data: IssueTitleUpdateData) {
  const { title, owner, repoName, number, token } = data;
  const res = await fetchWithHeaders(
    `/repos/${owner}/${repoName}/issues/${number}`,
    token,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
    }
  );
  return res;
}

export function useUpdateIssueTitle(
  data: IssueTitleUpdateData,
  queryClient: QueryClient
) {
  const { number } = data;
  const setEditing = useUpdateIssueTitleContext((state) => state.setIsEditing);
  return useMutation(() => updateIssueTitle(data), {
    onMutate: async (data: string) => {
      await queryClient.cancelQueries(["issue"]);
      const previousIssue = queryClient.getQueryData<Issue>(["issue"]);
      if (previousIssue) {
        queryClient.setQueryData<Issue>(["issue"], (old) => {
          if (old)
            return {
              ...old,
              title: data,
            };
        });
      }
      return { previousIssue };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["issue", { issueId: number.toString() }], data);
      setEditing(false);
    },
    onError: (_err, _data, context) => {
      if (context?.previousIssue) {
        queryClient.setQueryData<Issue>(["issue"], context.previousIssue);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["issue", { issueId: number.toString() }]);
    },
  });
}
