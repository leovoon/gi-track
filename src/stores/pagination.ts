import { create } from "zustand";

interface Pagination {
  page: number;
  per_page: number;
  setPage: (page: Pagination["page"]) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const usePaginationStore = create<Pagination>((set) => ({
  page: 1,
  per_page: 5,
  setPage: (page: Pagination["page"]) => set({ page }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
}));
