import { createSlice, nanoid } from "@reduxjs/toolkit";
import getNowTimeStamp from "../../utils/getNowTimeStamps";

export type PostsState = {
  data: Post[];
  status: string;
  error: string | null;
};
export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
}

export interface PostAddedAction {
  type: string;
  payload: Post;
}

export interface PostUpdatedAction {
  type: string;
  payload: Post;
}

export interface ReactionAddedAction {
  type: string;
  payload: {
    postId: string;
    reaction: keyof Post["reactions"];
  };
}

const initialState: PostsState = { data: [], status: "idle", error: null };
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    postAdded: {
      reducer(state: PostsState, action: PostAddedAction) {
        state.data.push(action.payload);
      },
      prepare({ title, content, userId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: getNowTimeStamp(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        };
      },
    },
    postUpdated: (state: PostsState, action: PostUpdatedAction) => {
      const { id, title, content } = action.payload;
      const existingPost = state.data.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded: (state: PostsState, action: ReactionAddedAction) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.data.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
});
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
