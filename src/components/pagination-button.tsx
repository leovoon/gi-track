import { usePaginationStore } from "@/stores/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  itemsLength,
  isFetching,
  isPreviousData,
}: {
  itemsLength: number;
  isFetching: boolean;
  isPreviousData: boolean;
}) {
  const [page, per_page, nextPage, prevPage] = usePaginationStore((state) => [
    state.page,
    state.per_page,
    state.nextPage,
    state.prevPage,
  ]);
  return (
    <div className="grid grid-cols-3 items-center my-10">
      <Button
        variant="outline"
        size="default"
        disabled={page === 1}
        onClick={() => {
          if (page - 1 > 0) {
            prevPage();
          }
        }}
      >
        <ChevronLeft size={16} />
        <span className="ml-2">Previous</span>
      </Button>
      <p className="text-center">
        Page {page} {isFetching ? <span>...</span> : ""}
      </p>
      <Button
        variant="outline"
        size="default"
        onClick={() => {
          if (itemsLength !== 0 && !isPreviousData) {
            nextPage();
          }
        }}
        disabled={itemsLength < per_page || isPreviousData}
      >
        <ChevronRight size={16} />
        <span className="ml-2">Next</span>
      </Button>
    </div>
  );
}
