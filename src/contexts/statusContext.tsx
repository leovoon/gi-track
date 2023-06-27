import { FC, PropsWithChildren, createContext, useState } from "react";

type StatusContextType = {
  status: "open" | "closed" | "";
  setStatus: React.Dispatch<React.SetStateAction<statusType>>;
};

export type statusType = StatusContextType["status"];

export const statusContext = createContext<StatusContextType>({
  status: "",
  setStatus: () => {},
});

export const StatusContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<StatusContextType["status"]>("");
  return (
    <statusContext.Provider value={{ status, setStatus }}>
      {children}
    </statusContext.Provider>
  );
};
