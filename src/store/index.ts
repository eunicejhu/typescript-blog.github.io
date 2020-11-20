import { configureStore } from "@reduxjs/toolkit";
import postsReducer, { Post } from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import notificationsReducer, {
  Notification,
} from "../features/notifications/notificationsSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type State = ReturnType<typeof store.getState>;
// selectors
export const selectAllPosts = (state: State): Post[] => state.posts.data;
export const selectPostById = (
  state: State,
  postId: string
): Post | undefined => state.posts.data.find((post) => post.id === postId);
export const selectAllNotifications = (state: State): Notification[] =>
  state.notifications;

export default store;
