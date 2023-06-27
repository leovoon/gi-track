import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

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
    `https://node-clerk-proxy.vercel.app/api/users/${userId}/oauth_access_tokens/${provider}`
  );

  return await res.json();
}

export const useAccessToken = () => {
  const { userId } = useAuth();
  if (!userId) {
    throw new Error("No user id found");
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
