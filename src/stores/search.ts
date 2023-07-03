import { create } from "zustand";

interface SelfSearch {
  selfSearch: string;
  setSelfSearch: (selfSearch: SelfSearch["selfSearch"]) => void;
}

interface GlobalSearch {
  globalSearch: string;
  setGlobalSearch: (globalSearch: GlobalSearch["globalSearch"]) => void;
}

export const useSelfSearchStore = create<SelfSearch>((set) => ({
  selfSearch: "",
  setSelfSearch: (selfSearch: SelfSearch["selfSearch"]) => set({ selfSearch }),
}));

export const useGlobalSearchStore = create<GlobalSearch>((set) => ({
  globalSearch: "",
  setGlobalSearch: (globalSearch: GlobalSearch["globalSearch"]) =>
    set({ globalSearch }),
}));
