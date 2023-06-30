import { fetchWithHeaders } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "./useAccessToken";

export default function useLabels() {
  const token = useToken();
  const labels = useQuery(
    ["labels"],
    ({ signal }) =>
      fetchWithHeaders("/repos/leovoon/practice-git/labels", token, { signal }),
    {
      enabled: !!token,
      staleTime: 1000 * 60 * 60,
    }
  );

  return labels;
}
