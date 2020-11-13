import React from "react";
import { Provider } from "react-redux";
import store from "../store";

type Props = { children: React.ReactNode };
const StoreWrapper: React.FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
export default StoreWrapper;
