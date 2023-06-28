import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "./useAccessToken";
import { fetchWithHeaders } from "@/lib/utils";

export interface Issues {
  total_count: number;
  incomplete_results: boolean;
  items: Issue[];
  message?: string;
}

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
  assignees: Assignee2[];
  milestone: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  active_lock_reason: any;
  draft: boolean;
  pull_request: PullRequest;
  body?: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: any;
  state_reason: any;
  score: number;
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

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: string;
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
const constructLabelsString = (label: string[] | null) => {
  if (!label) {
    return null;
  }
  return label
    .map((item) => {
      if (item.includes(" ")) {
        return `label:"${item}"`;
      }
      return `label:"${item}"`;
    })
    .join(",");
};

export function useIssues(
  search: string,
  label?: string[] | null,
  status?: string,
  myIssuesOnly?: boolean
) {
  const { user } = useUser();
  const token = useAccessToken();
  if (!user) throw new Error("No user");
  const username = user.username;
  const statusStr = status ? `is:${status}` : "";
  const labelsStr = label?.length ? constructLabelsString(label) : "";
  const myIssuesOnlyStr = myIssuesOnly ? `author:${username}` : "";

  const searchString = encodeURIComponent(
    `${search} ${myIssuesOnlyStr} ${statusStr} ${labelsStr} is:issue type:issue`
  );

  const issues = useQuery<Issues>(
    ["issues", { searchString, token, myIssuesOnly }],
    () => fetchWithHeaders(`/search/issues?q=${searchString}`, token),
    { enabled: myIssuesOnly && !!token }
  );

  return issues;
}

export function useSearchGlobalIssues(
  search: string,
  label?: string[] | null,
  status?: string,
  myIssuesOnly?: boolean
) {
  const token = useAccessToken();
  const statusStr = status ? `is:${status}` : "";
  const labelsStr = label?.length ? constructLabelsString(label) : "";
  let searchStr = search;

  if (!search) {
    searchStr = "Tanstack/query";
  }

  const searchString = encodeURIComponent(
    `${searchStr} ${statusStr} ${labelsStr} is:issue type:issue`
  );

  const issues = useQuery<Issues>(
    ["issues", { searchString, token, myIssuesOnly }],
    () => fetchWithHeaders(`/search/issues?q=${searchString}`, token),
    { enabled: !myIssuesOnly && !!token }
  );

  return issues;
}
