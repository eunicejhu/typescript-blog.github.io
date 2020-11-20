import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../../test/mock_data";

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
  /**
   * TODO: axios
   */
  const fetch = new Promise<User[]>((resolve) => {
    setTimeout(() => {
      return resolve(INITIAL_STATE.users.data);
    }, 1000);
  });
  res = await fetch;
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
  extraReducers: {
    [(fetchUsers.fulfilled as unknown) as string]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload;
    },
  },
});

const { reducer } = usersSlice;

export default reducer;
