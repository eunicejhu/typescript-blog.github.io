import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice.ts";

export const INITIAL_STATE = {
  posts: [
    { id: "1", title: "First test Post!", content: "test!" },
    { id: "2", title: "Second test Post", content: "test" },
  ],
};

const renderWithStoreAndRouter = (
  ui,
  {
    initialState = INITIAL_STATE,
    store = createStore(combineReducers({ posts: postsReducer }), initialState),
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
