import { create } from "zustand";

interface StatusState {
  status: "open" | "closed" | "";
  setStatus: (status: StatusState["status"]) => void;
}
export type StatusType = StatusState["status"];

export const useStatusStore = create<StatusState>((set) => ({
  status: "",
  setStatus: (status) => set({ status }),
}));
