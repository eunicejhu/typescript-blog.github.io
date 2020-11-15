import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { INITIAL_STATE } from "./mock_data";
import { rootReducer } from "./store.ts";

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
