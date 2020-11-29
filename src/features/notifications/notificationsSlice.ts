import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectAllNotifications } from "../../store/selectors";
import { State } from "../../store/types";
import Client from "../../api/client";

export interface Notification {
  id: string;
  date: string; // timestamp, ISO string
  userId: string;
  message: string;
}

export type NotificationsState = Notification[];

export const fetchAll = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { getState }) => {
    const notifications = selectAllNotifications(getState() as State);
    const latestTimestamp = notifications.slice().pop()?.date;
    let res;
    res = await Client.fetchAllNotifications<Notification[]>(latestTimestamp);
    return res;
  }
);
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [] as NotificationsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      return action.payload.data;
    });
  },
});

const { reducer } = notificationsSlice;

export default reducer;
