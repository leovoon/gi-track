import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import Status from "./status";
import Labels from "./labels";
import { Filter, FilterX } from "lucide-react";

export function CollapsibleFilters() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full flex flex-col"
      >
        <CollapsibleTrigger className="sm:hidden self-end " asChild>
          <Button
            variant="ghost"
            size="sm"
            className={isOpen ? "bg-muted/50" : ""}
          >
            {isOpen ? <FilterX /> : <Filter />}
            <span className="sr-only">Toggle Filters</span>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="sm:hidden space-y-4 bg-muted/50 rounded-md px-2 py-3">
          <h1 className="text-xl mb-4">Labels</h1>
          <Labels />
          <h1 className="text-xl mb-4">Status</h1>
          <Status />
        </CollapsibleContent>
      </Collapsible>

      {/* Desktop */}
      <div className="hidden sm:block space-y-4">
        <h1 className="text-xl mb-4">Labels</h1>
        <Labels />
        <h1 className="text-xl mb-4">Status</h1>
        <Status />
      </div>
    </>
  );
}
