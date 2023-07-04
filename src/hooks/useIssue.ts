import {
  QueryClient,
  UseQueryOptions,
  useQueries,
} from "@tanstack/react-query";
import { fetchWithHeaders } from "@/lib/utils";
import { useToken } from "./useAccessToken";
import { Issues } from "./useIssues";
export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: Assignee;
  assignees?: Assignee2[];
  milestone: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: any;
  author_association: string;
  active_lock_reason: any;
  body?: string;
  closed_by?: ClosedBy;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: any;
  state_reason: string;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface Assignee {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Assignee2 {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ClosedBy {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export type IssueCommentsType = Comment[];

export interface Comment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: User;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string;
  reactions: Reactions;
  performed_via_github_app: any;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export function useIssue(
  params: {
    repoUsername?: string;
    repoName?: string;
    issueId?: string;
  },
  queryClient: QueryClient
) {
  const token = useToken();
  const { repoUsername, repoName, issueId } = params;

  const [issueQuery, issueCommentsQuery] = useQueries<
    [UseQueryOptions<Issue>, UseQueryOptions<IssueCommentsType>]
  >({
    queries: [
      {
        queryKey: ["issue", { issueId }],
        queryFn: ({ signal }) =>
          fetchWithHeaders(
            `/repos/${repoUsername}/${repoName}/issues/${issueId}`,
            token,
            { signal }
          ),
        enabled: !!token,
        staleTime: 1000 * 60,
        initialData: () => {
          const issues = queryClient.getQueryData<Issues>(["issues"], {
            exact: false,
          });
          if (!issues) return undefined;
          return issues.items.find((issue) => issue.number === Number(issueId));
        },
        initialDataUpdatedAt: () => {
          return queryClient.getQueryState<Issues>(["issues"], { exact: false })
            ?.dataUpdatedAt;
        },
      },
      {
        queryKey: ["issueComments", { issueId }],
        queryFn: ({ signal }) =>
          fetchWithHeaders(
            `/repos/${repoUsername}/${repoName}/issues/${issueId}/comments`,
            token,
            { signal }
          ),
        enabled: !!token,
      },
    ],
  });

  return {
    issueQuery,
    issueCommentsQuery,
  };
}
