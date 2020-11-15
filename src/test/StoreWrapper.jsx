import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { store } from "./store.ts";

// weakness: we lose the flexibility to pass in initialState
const StoreWrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
StoreWrapper.propTypes = {
  children: PropTypes.element,
};
StoreWrapper.defaultProps = {
  children: null,
};
export default StoreWrapper;
