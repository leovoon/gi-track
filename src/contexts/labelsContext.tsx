import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type selectLabelContextType = {
  selectedLabel: string[];
  setSelectedLabel: React.Dispatch<React.SetStateAction<string[]>>;
};

export const selectLabelContext = createContext<selectLabelContextType>({
  selectedLabel: [],
  setSelectedLabel: () => {},
});

export const SelectLabelContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<
    selectLabelContextType["selectedLabel"]
  >([]);

  return (
    <selectLabelContext.Provider value={{ selectedLabel, setSelectedLabel }}>
      {children}
    </selectLabelContext.Provider>
  );
};

type selectedLabelContextType = selectLabelContextType["selectedLabel"];
export const selectedLabelContext = createContext<selectedLabelContextType>([]);
export const SelectedLabelProvider: FC<PropsWithChildren> = ({ children }) => {
  const { selectedLabel } = useContext(selectLabelContext);
  return (
    <selectedLabelContext.Provider value={selectedLabel}>
      {children}
    </selectedLabelContext.Provider>
  );
};
