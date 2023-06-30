import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useSessionStorage } from "usehooks-ts";

type OauthToken = {
  object: string;
  token: string;
  provider: string;
  public_metadata: {};
  label: string;
  scopes: [string];
};

async function fetchAccessToken(userId: string, provider: string) {
  const res = await fetch(
    `${
      import.meta.env.VITE_NODE_SERVER_URL
    }/api/users/${userId}/oauth_access_tokens/${provider}`
  );

  return res.json();
}

export const useAccessToken = () => {
  const { userId } = useAuth();
  if (!userId) {
    throw new Error("No user");
  }
  const provider = "oauth_github";
  const { data, isError } = useQuery<OauthToken[]>(
    ["accessToken", userId, provider],
    () => fetchAccessToken(userId, provider),
    {
      enabled: !!userId,
    }
  );

  if (isError) console.error("Error fetching access token");

  if (!data) return null;

  const token = data[0].token;

  return token;
};

export const useToken = () => {
  const [value] = useSessionStorage("ac", "");

  return value;
};
