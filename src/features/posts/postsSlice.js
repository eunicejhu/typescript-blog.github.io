import { createSlice } from "@reduxjs/toolkit";
import initialState from "../../helpers/initialState";

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState.posts,
  reducers: {},
});

export default postsSlice.reducer;
