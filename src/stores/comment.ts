import { create } from "zustand";

interface AddComment {
  body: string;
  setBody: (body: AddComment["body"]) => void;
}

export const useCommentStore = create<AddComment>((set) => ({
  body: "",
  setBody: (body: AddComment["body"]) => set({ body }),
}));
