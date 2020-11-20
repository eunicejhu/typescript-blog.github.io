// selectors
import { State } from "./index";
import { Notification } from "../features/notifications/notificationsSlice";
import { Post } from "../features/posts/postsSlice";
export const selectAllPosts = (state: State): Post[] => state.posts.data;
export const selectPostById = (
  state: State,
  postId: string
): Post | undefined => state.posts.data.find((post) => post.id === postId);
export const selectAllNotifications = (state: State): Notification[] =>
  state.notifications;
