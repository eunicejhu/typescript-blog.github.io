import React from "react";
import { Provider } from "react-redux";
import store from "../store";

type Props = { children: React.ReactNode };

// weakness: we lose the flexibility to pass in initialState
const StoreWrapper: React.FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
export default StoreWrapper;
