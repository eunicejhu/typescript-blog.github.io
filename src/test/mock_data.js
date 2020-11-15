import { createStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice.ts";
import usersReducer from "../features/users/usersSlice.ts";

export const INITIAL_STATE = {
  posts: [
    { id: "1", title: "First test Post!", content: "test!" },
    { id: "2", title: "Second test Post", content: "test" },
  ],
  users: [
    { id: "0", name: "Tianna Jenkins" },
    { id: "1", name: "Kevin Grant" },
    { id: "2", name: "Madison Price" },
  ],
};

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, INITIAL_STATE);
