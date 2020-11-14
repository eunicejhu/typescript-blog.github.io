import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice.ts";

const INITIAL_STATE = {
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
  }
) => {
  const history = createMemoryHistory();
  history.push(route);
  const wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return render(ui, { wrapper });
};

export default renderWithStoreAndRouter;
