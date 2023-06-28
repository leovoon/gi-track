import { useContext } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { searchContext } from "@/contexts/searchContext";

export default function IssuesSearchForm() {
  const { setSearch } = useContext(searchContext);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(
          (e.currentTarget.elements.namedItem("search") as HTMLInputElement)
            .value
        );
      }}
      className="my-2"
    >
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input type="search" placeholder="Search issues" name="search" />
        <Button type="submit" size="sm">
          Search
        </Button>
      </div>
    </form>
  );
}
