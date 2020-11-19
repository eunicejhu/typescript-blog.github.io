import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../api/client";
const UPDATE_POST_ERROR_MSG = "Failed to update post";
const FETCH_POSTS_ERROR_MSG = "Failed to fetch posts";
export type PostsState = {
  data: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  updatePostError: string | undefined;
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

type updatePostThunkArg = { id: string; title: string; content: string };
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, title, content }: updatePostThunkArg) => {
    let res;
    res = await Client.updatePost<updatePostThunkArg>({
      id,
      title,
      content,
    });
    return res;
  }
);

export type addReactionThunkArg = {
  postId: string;
  reaction: keyof Post["reactions"];
};
export const addReaction = createAsyncThunk(
  "posts/addReaction",
  async ({ postId, reaction }: addReactionThunkArg) => {
    let res;
    res = await Client.addReaction<addReactionThunkArg>({
      postId,
      reaction,
    });
    return res;
  }
);
const initialState: PostsState = {
  data: [],
  status: "idle",
  error: undefined,
  updatePostError: undefined,
};
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPost
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.status = "succeeded";
      state.error = undefined;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      let errorMessageForDev = `${action.type}: Error from REST API (action.error.message)`;
      console.error(errorMessageForDev);
      state.error = FETCH_POSTS_ERROR_MSG;
      state.status = "failed";
      state.data = [];
    });
    // addNewPost
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.data.push(action.payload.data);
    });
    // updatePost
    builder.addCase(updatePost.fulfilled, (state, action) => {
      let { id, title, content } = action.payload.data;
      const existingPost = state.data.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      } else {
        // TODO: log detailed error message for developer
        let errorMessageForDev = `${
          action.type
        }: Error from client: existingPost not found for data from server ${JSON.stringify(
          action.payload.data
        )}`;
        console.error(errorMessageForDev);

        let errorMessageForUser = UPDATE_POST_ERROR_MSG;
        state.updatePostError = errorMessageForUser;
      }
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      let errorMessageForDev = `${action.type}: Error from REST API (action.error.message)`;
      console.error(errorMessageForDev);
      let errorMessageForUser = UPDATE_POST_ERROR_MSG;
      state.updatePostError = errorMessageForUser;
    });
    // addReaction
    builder.addCase(addReaction.fulfilled, (state, action) => {
      const existingPost = state.data.find(
        (post) => post.id === action.payload.data.postId
      );
      if (existingPost) {
        let reaction = action.payload.data.reaction;
        existingPost.reactions[reaction] += 1;
      } else {
        let errorMessageForDev = `${
          action.type
        }: Error from client: existingPost not found for data from server ${JSON.stringify(
          action.payload.data
        )}`;
        console.error(errorMessageForDev);
      }
    });
    builder.addCase(addReaction.rejected, (state, action) => {
      let errorMessageForDev = `${action.type}: Error from REST API (action.error.message)`;
      console.error(errorMessageForDev);
    });
  },
});

export default postsSlice.reducer;
