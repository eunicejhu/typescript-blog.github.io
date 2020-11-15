import { createStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import { INITIAL_STATE } from "./mock_data";
export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, INITIAL_STATE);
