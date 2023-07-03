import { create } from "zustand";

interface Label {
  label: string[];
  setLabel: (label: Label["label"]) => void;
}

export const useLabelStore = create<Label>((set) => ({
  label: [],
  setLabel: (label: Label["label"]) => set({ label }),
}));
