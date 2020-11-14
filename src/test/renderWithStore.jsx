import React from "react";
import { render } from "@testing-library/react";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import postReducer from "../features/posts/postsSlice.ts";

export const INITIAL_STATE = {
  posts: [
    { id: "1", title: "First test Post!", content: "test!" },
    { id: "2", title: "Second test Post", content: "test" },
  ],
};

const renderWithStore = (
  ui,
  {
    initialState = INITIAL_STATE,
    store = createStore(combineReducers({ posts: postReducer }), initialState),
  } = {}
) => {
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper });
};

export default renderWithStore;
