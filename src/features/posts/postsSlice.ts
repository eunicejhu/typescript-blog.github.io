import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import getNowTimeStamp from "../../utils/getNowTimeStamps";
// import client from "../../api/client";
import { INITIAL_STATE } from "../../test/mock_data";

export type PostsState = {
  data: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
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

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  let res;
  /** TODO: client */
  const fetch = new Promise<{ posts: Post[] }>((resolve, reject) => {
    setTimeout(() => {
      return resolve({ posts: INITIAL_STATE.posts.data });
    }, 1000);
  });
  res = await fetch;
  return res.posts;
});
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
  extraReducers: {
    [(fetchPosts.pending as unknown) as string]: (state) => {
      state.status = "loading";
    },
    [(fetchPosts.fulfilled as unknown) as string]: (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    },
    [(fetchPosts.rejected as unknown) as string]: (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
