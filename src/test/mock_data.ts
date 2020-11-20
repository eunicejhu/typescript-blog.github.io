import { sub, parseISO } from "date-fns";
import { State } from "../store/index";
import { PostsState } from "../features/posts/postsSlice";
import { UsersState } from "../features/users/usersSlice";

export const NOW = "2020-11-15T16:16:08.493Z";
export const TIME_AGO = "28 minutes";
export const EMPTY_STATE: State = {
  posts: {
    status: "succeeded",
    error: undefined,
    data: [],
    updatePostError: undefined,
  },
  users: { data: [], status: "succeeded", error: null },
  notifications: [],
};
export const POSTS: PostsState = {
  status: "idle",
  error: undefined,
  updatePostError: undefined,
  data: [
    {
      id: "1",
      title: "First test Post!",
      content: "test!",
      userId: "1",
      date: sub(parseISO(NOW), { days: 1 }).toISOString(),
      reactions: { thumbsUp: 0, hooray: 0, heart: 4, rocket: 0, eyes: 0 },
    },
    {
      id: "2",
      title: "Second test Post",
      content: "test",
      userId: "0",
      date: sub(parseISO(NOW), { days: 5 }).toISOString(),
      reactions: { thumbsUp: 3, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    },
  ],
};

export const USERS: UsersState = {
  data: [
    { id: "0", name: "Tianna Jenkins" },
    { id: "1", name: "Kevin Grant" },
    { id: "2", name: "Madison Price" },
  ],
  status: "succeeded",
  error: null,
};

export const NOTIFICATIONS = [
  {
    id: "1",
    date: "2020-11-15T16:16:08.493Z", // timestamp, ISO string
    userId: "2",
    message: "Glad to know you",
  },
  {
    id: "2",
    date: "2020-11-16T18:16:08.493Z", // timestamp, ISO string
    userId: "1",
    message: "Concert in two weeks",
  },
  {
    id: "3",
    date: "2020-11-17T16:30:08.493Z", // timestamp, ISO string
    userId: "0",
    message: "Cinema next thursday",
  },
];
export const INITIAL_STATE: State = {
  posts: POSTS,
  users: USERS,
  notifications: NOTIFICATIONS,
};

export default { INITIAL_STATE };
