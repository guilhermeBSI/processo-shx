import React, { createContext, useState } from "react";


const DEFAULT_VALUE = {
  state: {
    cotation: [],
    loading: false,
  },
  setState: () => {},
};

const HomeContext = createContext(DEFAULT_VALUE);

const HomeContextProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);

  return (
    <HomeContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContextProvider };
export default HomeContext;