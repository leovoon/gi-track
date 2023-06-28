import { FC, PropsWithChildren, createContext, useState } from "react";

type searchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<searchType>>;
};

export type searchType = searchContextType["search"];

export const searchContext = createContext<searchContextType>({
  search: "",
  setSearch: () => {},
});

export const SearchContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = useState<searchContextType["search"]>("");
  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
};
