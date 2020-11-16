import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
}

const usersSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {},
});

export default usersSlice.reducer;
