import { createSlice } from "@reduxjs/toolkit";

export type State = Post[];
export interface Post {
  id: string;
  title: string;
  content: string;
}

export interface PostAddedAction {
  type: string;
  payload: Post;
}

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: (state: State, action: PostAddedAction) => {
      state.push(action.payload);
    },
  },
});
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
