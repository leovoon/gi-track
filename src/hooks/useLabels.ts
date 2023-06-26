import { fetchWithHeaders } from "@/lib/utils";
import { useQuery } from "react-query";
import { useAccessToken } from "./useAccessToken";

export default function useLabels() {
  const token = useAccessToken();
  const labels = useQuery(
    "labels",
    () => fetchWithHeaders("/repos/leovoon/practice-git/labels", token),
    {
      enabled: !!token,
    }
  );

  return labels;
}
