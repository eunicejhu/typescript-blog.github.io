import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
}
export type State = User[];

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
});

export default usersSlice.reducer;
