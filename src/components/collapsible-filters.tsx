import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Filter, FilterX } from "lucide-react";
import { cn } from "@/lib/utils";
import AsideFilters from "./aside-filters";

export function CollapsibleFilters() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex items-start relative h-auto",
        isOpen ? "flex-col" : "justify-between"
      )}
    >
      <div
        className={cn("text-xl flex-grow h-min sm:block", {
          "self-start absolute left-0 top-0": isOpen,
        })}
      >
        Issues List
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn("w-auto", {
          "flex flex-col justify-end": isOpen,
        })}
      >
        <CollapsibleTrigger className="sm:hidden self-end " asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-none rounded-tl-md rounded-tr-md active:bg-muted/50 dark:active:bg-muted/70 ",
              isOpen
                ? " bg-muted/50 dark:bg-muted/70"
                : "dark:bg-inherit focus:bg-white"
            )}
          >
            {isOpen ? <FilterX /> : <Filter />}
            <span className="sr-only">Toggle Filters</span>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="sm:hidden bg-muted/50 dark:bg-muted/70 rounded-md rounded-tr-none px-2 py-3 -mt-[0.5px]">
          <AsideFilters className="space-y-4" />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
