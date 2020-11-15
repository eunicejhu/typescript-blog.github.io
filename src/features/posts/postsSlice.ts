import { createSlice, nanoid } from "@reduxjs/toolkit";

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

export interface PostUpdatedAction {
  type: string;
  payload: Post;
}

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: {
      reducer(state: State, action: PostAddedAction) {
        state.push(action.payload);
      },
      prepare({ title, content }) {
        return { payload: { id: nanoid(), title, content } };
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
  },
});
export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;
