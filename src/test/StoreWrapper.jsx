import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import postsReducer from "../features/posts/postsSlice.ts";

const INITIAL_STATE = {
  posts: [
    { id: "1", title: "First test Post!", content: "test!" },
    { id: "2", title: "Second test Post", content: "test" },
  ],
};
const store = createStore(
  combineReducers({ posts: postsReducer }),
  INITIAL_STATE
);
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
