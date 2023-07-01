import { CollapsibleFilters } from "@/components/collapsible-filters";
import IssuesList from "@/components/issues-list";
import Labels from "@/components/labels";
import Status from "@/components/status";
import {
  SelectLabelContextProvider,
  SelectedLabelProvider,
} from "@/contexts/labelsContext";
import { SearchGlobalContextProvider } from "@/contexts/searchGlobalContext";
import { SearchOwnContextProvider } from "@/contexts/searchOwnContext";
import { StatusContextProvider } from "@/contexts/statusContext";
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
        <SelectLabelContextProvider>
          <StatusContextProvider>
            <section className="w-full order-2 sm:order-1">
              <h1 className="text-xl mb-5">Issues List</h1>
              <SelectedLabelProvider>
                <SearchGlobalContextProvider>
                  <SearchOwnContextProvider>
                    <IssuesList />
                  </SearchOwnContextProvider>
                </SearchGlobalContextProvider>
              </SelectedLabelProvider>
            </section>
            <aside className="sm:w-1/2 order-1 sm:order-2 space-y-4">
              <CollapsibleFilters />
            </aside>
          </StatusContextProvider>
        </SelectLabelContextProvider>
      </div>
    </div>
  );
}
