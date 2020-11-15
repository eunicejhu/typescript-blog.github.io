import { configureStore } from "@reduxjs/toolkit";
import postsReducer, {
  State as postsState,
} from "../features/posts/postsSlice";
import usersReducer, {
  State as usersState,
} from "../features/users/usersSlice";

export interface State {
  posts: postsState;
  users: usersState;
}

export default configureStore({
  reducer: { posts: postsReducer, users: usersReducer },
});
