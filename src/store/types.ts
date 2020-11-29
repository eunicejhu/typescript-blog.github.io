import { PostsState } from "../features/posts/postsSlice";
import { NotificationsState } from "../features/notifications/notificationsSlice";
import { UsersState } from "../features/users/usersSlice";
export type State = {
  posts: PostsState;
  users: UsersState;
  notifications: NotificationsState;
};
