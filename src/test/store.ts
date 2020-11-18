import { configureStore, combineReducers } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-extraneous-dependencies
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import { INITIAL_STATE } from "./mock_data";
export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: INITIAL_STATE,
});
