import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectAllNotifications, State } from "../../store/index";
import Client from "../../api/client";

export interface Notification {
  id: string;
  date: string; // timestamp, ISO string
  userId: string;
  message: string;
}
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
type NotificationsState = Notification[];
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

export default notificationsSlice.reducer;
