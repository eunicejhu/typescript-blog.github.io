import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./mock_data";
import { rootReducer } from "./store.ts";

const renderWithStoreAndRouter = (
  ui,
  {
    initialState = INITIAL_STATE,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    route = "/",
  } = {}
) => {
  window.history.pushState({}, "Home", route);
  const wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  return render(ui, { wrapper });
};

export default renderWithStoreAndRouter;
