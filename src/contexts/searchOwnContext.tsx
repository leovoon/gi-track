import { FC, PropsWithChildren, createContext, useState } from "react";

type searchOwnContextType = {
  searchOwnTerm: string;
  setSearchOwnTerm: React.Dispatch<React.SetStateAction<searchOwnType>>;
};

export type searchOwnType = searchOwnContextType["searchOwnTerm"];

export const searchOwnContext = createContext<searchOwnContextType>({
  searchOwnTerm: "",
  setSearchOwnTerm: () => {},
});

export const SearchOwnContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [searchOwnTerm, setSearchOwnTerm] =
    useState<searchOwnContextType["searchOwnTerm"]>("");
  return (
    <searchOwnContext.Provider value={{ searchOwnTerm, setSearchOwnTerm }}>
      {children}
    </searchOwnContext.Provider>
  );
};
