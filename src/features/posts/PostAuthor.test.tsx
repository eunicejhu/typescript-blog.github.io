import React from "react";
import PostAuthor from "./PostAuthor";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { fetchUsers } from "../users/usersSlice";

import { makeServer } from "../../server";
import { Server } from "miragejs";
describe("PostAuthor test", () => {
  let server: Server;
  beforeEach(async () => {
    server = makeServer();
    server.createList("user", 3);

    store.dispatch(fetchUsers());
  });
  afterEach(() => {
    server.shutdown();
  });

  test("render correctly", async () => {
    const ui = (
      <Provider store={store}>
        <PostAuthor userId={"3"} />
      </Provider>
    );
    const { findByText } = render(ui);
    expect(await findByText(/Madison Price/i)).toBeInTheDocument();
  });

  test("show By Unknown author if user does not exist", () => {
    const ui = (
      <Provider store={store}>
        <PostAuthor userId={"unknown"} />
      </Provider>
    );
    const { getByText } = render(ui);
    expect(getByText(/Unknown author/i)).toBeInTheDocument();
  });
});
