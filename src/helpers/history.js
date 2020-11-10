import { createBrowserHistory, createMemoryHistory } from "history";

const isTest = process.env.NODE_ENV === "test";
const history = isTest
  ? createMemoryHistory({ initialEntries: ["/initial"] })
  : createBrowserHistory();

export default history;
