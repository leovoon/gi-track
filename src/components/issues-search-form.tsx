import { Input } from "./ui/input";
import { Button } from "./ui/button";
import QueryLoader from "./query-loader";
import { useGlobalSearchStore, useSelfSearchStore } from "@/stores/search";

export default function IssuesSearchForm({ myIssueOnly = false }) {
  const setSearchGlobalTerm = useGlobalSearchStore(
    (state) => state.setGlobalSearch
  );
  const setSearchOwnTerm = useSelfSearchStore((state) => state.setSelfSearch);

  return (
    <div className="grid grid-cols-6  sm:grid-cols-4 gap-4">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const value = (
            e.currentTarget.elements.namedItem("search") as HTMLInputElement
          ).value;
          if (myIssueOnly) setSearchOwnTerm(value);
          else setSearchGlobalTerm(value);
        }}
        className="my-2 col-span-6 sm:col-span-3"
      >
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search issues"
            name="search"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                if (myIssueOnly) setSearchOwnTerm("");
                else setSearchGlobalTerm("");
              }
            }}
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </div>
      </form>
      <QueryLoader />
    </div>
  );
}
