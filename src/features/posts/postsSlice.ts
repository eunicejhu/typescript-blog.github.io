import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Client from "../../api/client";

export type PostsState = {
  data: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
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

export interface AddNewPostAction {
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
  res = await Client.fetchPost<Post[]>();
  return res;
});

type addNewPostThunkArg = { title: string; content: string; userId: string };
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async ({ title, content, userId }: addNewPostThunkArg) => {
    let res;
    res = await Client.addNewPost<Post>({
      title,
      content,
      userId,
    } as Post);
    return res;
  }
);
const initialState: PostsState = { data: [], status: "idle", error: undefined };
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    postUpdated: (state: PostsState, action: PayloadAction<Post>) => {
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
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
      state.error = undefined;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
      state.data = [];
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.data.push(action.payload.data);
    });
  },
});

export const { postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
