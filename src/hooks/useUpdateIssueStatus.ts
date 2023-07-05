import { fetchWithHeaders } from "@/lib/utils";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { IssueType } from "./useIssue";

interface IssueStatusUpdateData {
  state: string;
  owner: string;
  repoName: string;
  number: number;
  token: string;
}

async function updateIssueState(data: IssueStatusUpdateData) {
  const { state, owner, repoName, number, token } = data;
  const res = await fetchWithHeaders(
    `/repos/${owner}/${repoName}/issues/${number}`,
    token,
    {
      method: "PATCH",
      body: JSON.stringify({ state }),
    }
  );
  return res;
}

export function useUpdateIssueStatus(
  data: IssueStatusUpdateData,
  queryClient: QueryClient
) {
  const { number } = data;
  // const setEditing = useUpdateIssueTitleContext((state) => state.setIsEditing);
  return useMutation(() => updateIssueState(data), {
    mutationKey: ["issue", "state"],
    onMutate: async (data: string) => {
      await queryClient.cancelQueries(["issue"]);
      const previousIssue = queryClient.getQueryData<IssueType>(["issue"]);
      if (previousIssue) {
        queryClient.setQueryData<IssueType>(["issue"], (old) => {
          if (old)
            return {
              ...old,
              state: data,
            };
        });
      }
      return { previousIssue };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["issue", { issueId: number.toString() }], data);
    },
    onError: (_err, _data, context) => {
      if (context?.previousIssue) {
        queryClient.setQueryData<IssueType>(["issue"], context.previousIssue);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["issue", { issueId: number.toString() }]);
    },
  });
}
