import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
