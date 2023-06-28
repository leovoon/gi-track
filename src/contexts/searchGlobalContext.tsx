import { FC, PropsWithChildren, createContext, useState } from "react";

type searchGlobalContextType = {
  searchGlobalTerm: string;
  setSearchGlobalTerm: React.Dispatch<React.SetStateAction<searchGlobalType>>;
};

export type searchGlobalType = searchGlobalContextType["searchGlobalTerm"];

export const searchGlobalContext = createContext<searchGlobalContextType>({
  searchGlobalTerm: "TanStack/query",
  setSearchGlobalTerm: () => {},
});

export const SearchGlobalContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [searchGlobalTerm, setSearchGlobalTerm] =
    useState<searchGlobalContextType["searchGlobalTerm"]>("");
  return (
    <searchGlobalContext.Provider
      value={{ searchGlobalTerm, setSearchGlobalTerm }}
    >
      {children}
    </searchGlobalContext.Provider>
  );
};
