import { create } from "zustand";

interface Owner {
  isOwner: boolean;
  setIsOwner: (isOwner: Owner["isOwner"]) => void;
}

export const useOwnerStore = create<Owner>((set) => ({
  isOwner: false,
  setIsOwner: (isOwner: Owner["isOwner"]) => set({ isOwner }),
}));
