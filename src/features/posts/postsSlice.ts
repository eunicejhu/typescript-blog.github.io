import { createSlice, nanoid } from "@reduxjs/toolkit";
import getNowTimeStamp from "../../utils/getNowTimeStamps";

export type State = Post[];
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

const postsSlice = createSlice({
  name: "posts",
  initialState: [] as Post[],
  reducers: {
    postAdded: {
      reducer(state: State, action: PostAddedAction) {
        state.push(action.payload);
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
    postUpdated: (state: State, action: PostUpdatedAction) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded: (state: State, action: ReactionAddedAction) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
});
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
