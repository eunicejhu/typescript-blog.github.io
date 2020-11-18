import { sub, parseISO } from "date-fns";
import { State } from "../store/index";

export const NOW = "2020-11-15T16:16:08.493Z";
export const TIME_AGO = "28 minutes";
export const INITIAL_STATE: State = {
  posts: {
    status: "idle",
    error: null,
    data: [
      {
        id: "1",
        title: "First test Post!",
        content: "test!",
        userId: "1",
        date: sub(parseISO(NOW), { days: 1 }).toISOString(),
        reactions: { thumbsUp: 0, hooray: 0, heart: 4, rocket: 0, eyes: 0 },
      },
      {
        id: "2",
        title: "Second test Post",
        content: "test",
        userId: "0",
        date: sub(parseISO(NOW), { days: 5 }).toISOString(),
        reactions: { thumbsUp: 3, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
    ],
  },
  users: {
    data: [
      { id: "0", name: "Tianna Jenkins" },
      { id: "1", name: "Kevin Grant" },
      { id: "2", name: "Madison Price" },
    ],
    status: "succeeded",
    error: null,
  },
};

export default { INITIAL_STATE };
