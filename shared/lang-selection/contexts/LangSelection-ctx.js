import React, { useContext, useState } from "react";

const STORAGE_KEY = "OLANG-user";

export const LangSelectionContext = React.createContext();

export const LangUserProvider = ({ children }) => {
  const [selection, setSelection] = useState(null);

  return (
    <LangSelectionContext.Provider
      value={{
        selection,
        setSelection
      }}
    >
      {children}
    </LangSelectionContext.Provider>
  );
};

export const useLangSelection = () => {
  return useContext(LangSelectionContext);
};
