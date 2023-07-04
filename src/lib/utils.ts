import { BadgeVariants } from "@/components/ui/badge";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLabelColor(labelName: string): BadgeVariants {
  switch (labelName) {
    case "bug":
      return "reddish";
    case "documentation":
      return "bluish";
    case "enhancement":
      return "cyan";
    case "duplicate":
      return "zinc";
    case "good first issue":
      return "purple";
    case "help wanted":
      return "teal";
    case "invalid":
      return "yellow";
    case "question":
      return "violet";
    case "wontfix":
      return "stone";
    default:
      return "secondary";
  }
}
export type GithubError = { message: string; documentation_url: string };

export async function fetchWithHeaders(
  url: string,
  token: string | null,
  options: RequestInit = {}
): Promise<any> {
  const githubEndpoint: string = "https://api.github.com";

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${githubEndpoint}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...headers,
    },
  });

  if (!response.ok) {
    const error: GithubError = await response.json();
    if (error.message) throw new Error(error.message);
    throw new Error("Error fetching data.");
  }

  return await response.json();
}
