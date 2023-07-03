import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Owner {
  isOwner: boolean;
  setIsOwner: (isOwner: Owner["isOwner"]) => void;
}

export const useOwnerStore = create<Owner>()(
  persist(
    (set) => ({
      isOwner: false,
      setIsOwner: (isOwner: Owner["isOwner"]) => set({ isOwner }),
    }),
    {
      name: "owner-storage",
    }
  )
);
