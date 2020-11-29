import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../api/client";

export interface User {
  id: string;
  name: string;
}

export interface UsersState {
  data: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  let res;
  res = await Client.fetchUsers<User[]>();
  return res;
});

const initialState: UsersState = {
  data: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;
