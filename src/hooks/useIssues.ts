import { useUser } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { useAccessToken } from "./useAccessToken";

export function useIssues() {
  const { user } = useUser();
  const token = useAccessToken();
  if (!user) throw new Error("No user found");
  const username = user.username;
  const issues = useQuery(
    ["issues", username, token],
    async () => {
      const searchString = `user:${username}`;
      const res = await fetch(
        `https://api.github.com/search/issues?q=${encodeURIComponent(
          searchString
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await res.json();
    },
    { enabled: !!token }
  );

  return issues;
}
