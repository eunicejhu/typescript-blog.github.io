import React from "react";
import { Provider } from "react-redux";
import NotificationsList from "./NotificationsList";
import { render } from "@testing-library/react";
import store from "../../store/index";
import { fetchUsers } from "../users/usersSlice";

import { makeServer } from "../../server";

describe("NotificationsList test", () => {
  let server;
  beforeEach(() => {
    server = makeServer();
    server.createList("user", 3);
    server.createList("notification", 3);

    store.dispatch(fetchUsers());
  });
  it("render correctly", async () => {
    const { getByText, findByText, container } = render(
      <Provider store={store}>
        <NotificationsList />
      </Provider>
    );
    expect(getByText(/Loading/i)).toBeInTheDocument();
    expect(await findByText(/Glad to know you/i)).toBeInTheDocument();
    expect(store.getState().notifications.length).toBe(3);
    expect(container.querySelectorAll("article").length).toBe(3);
  });
});
