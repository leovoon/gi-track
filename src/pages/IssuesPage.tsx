import AsideFilters from "@/components/aside-filters";
import { CollapsibleFilters } from "@/components/collapsible-filters";
import IssuesList from "@/components/issues-list";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

export default function IssuesPage() {
  const token = useAccessToken();
  const [, setValue] = useSessionStorage("ac", token);

  useEffect(() => {
    if (!token) return;
    setValue(token);
  }, [token]);

  return (
    <div className="p-2 mt-5">
      <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4">
        <section className="w-full order-2 sm:order-1">
          <CollapsibleFilters />
          <IssuesList />
        </section>
        <aside className="sm:w-1/2 order-1 sm:order-2 space-y-4 ">
          <AsideFilters className="hidden sm:block sm:top-0 sm:sticky pt-4" />
        </aside>
      </div>
    </div>
  );
}
