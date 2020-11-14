import { configureStore } from "@reduxjs/toolkit";
import postsReducer, {
  State as postsState,
} from "../features/posts/postsSlice";

export interface State {
  posts: postsState;
}

export default configureStore({
  reducer: { posts: postsReducer },
});
