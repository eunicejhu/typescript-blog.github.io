import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: { posts: postsReducer, users: usersReducer },
});

export type State = ReturnType<typeof store.getState>;
// selectors
export const selectAllPosts = (state: State) => state.posts;
export const selectPostById = (state: State, postId: string) =>
  state.posts.find((post) => post.id === postId);

export default store;
