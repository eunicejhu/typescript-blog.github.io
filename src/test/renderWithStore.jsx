import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { INITIAL_STATE, rootReducer } from "./mock_data";

const renderWithStore = (
  ui,
  {
    initialState = INITIAL_STATE,
    store = createStore(rootReducer, initialState),
  } = {}
) => {
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper });
};

export default renderWithStore;
