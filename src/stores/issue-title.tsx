import React, { useRef } from "react";
import { createStore } from "zustand";
import { useContext } from "react";
import { useStore } from "zustand";

interface IssueTitleProps {
  title: string;
}

interface IssueTitleState extends IssueTitleProps {
  isEditing: boolean;
  setTitle: (title: string) => void;
  setIsEditing: (isEditing: boolean) => void;
}

type IssueTitleUpdateStore = ReturnType<typeof createTitleUpdateStore>;

const createTitleUpdateStore = (initProps?: Partial<IssueTitleProps>) => {
  const DEFAULT_PROPS: IssueTitleProps = {
    title: "",
  };
  return createStore<IssueTitleState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    isEditing: false,
    setTitle: (title: string) => set(() => ({ title })),
    setIsEditing: (isEditing: boolean) => set(() => ({ isEditing })),
  }));
};

type IssueTitleProviderProps = React.PropsWithChildren<IssueTitleProps>;
const IssueTitleUpdateContext =
  React.createContext<IssueTitleUpdateStore | null>(null);
export const IssueTitleUpdateProvider = ({
  children,
  ...props
}: IssueTitleProviderProps) => {
  const storeRef = useRef<IssueTitleUpdateStore>();
  if (!storeRef.current) {
    storeRef.current = createTitleUpdateStore(props);
  }
  return (
    <IssueTitleUpdateContext.Provider value={storeRef.current}>
      {children}
    </IssueTitleUpdateContext.Provider>
  );
};

export function useUpdateIssueTitleContext<T>(
  selector: (state: IssueTitleState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(IssueTitleUpdateContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector, equalityFn);
}
