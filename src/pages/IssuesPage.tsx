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

export default function IssuesPage() {
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
              <h1 className="text-xl mb-5">Labels</h1>
              <Labels />
              <h1 className="text-xl mb-5">Status</h1>
              <Status />
            </aside>
          </StatusContextProvider>
        </SelectLabelContextProvider>
      </div>
    </div>
  );
}
