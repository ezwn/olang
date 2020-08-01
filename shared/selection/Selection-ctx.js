import React, { useContext, useState } from "react";

const SelectionContext = React.createContext();

export const SelectionProvider = ({ children }) => {
  const [selection, setSelection] = useState(null);

  return (
    <SelectionContext.Provider
      value={{
        selection,
        setSelection
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  return useContext(SelectionContext);
};
