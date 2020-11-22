import EditPostForm from "./EditPostForm";
import React from "react";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/index";
import { fetchPosts } from "./postsSlice";

import { makeServer } from "../../server";
import { Server } from "miragejs";
describe("EditPostFrom test", () => {
  let server: Server;
  beforeEach(() => {
    server = makeServer();
    server.createList("post", 2);

    store.dispatch(fetchPosts());
  });
  afterEach(() => {
    server.shutdown();
  });
  test("show no post found when post does not exist", async () => {
    const ui = (
      <MemoryRouter initialEntries={["/editPost/unknown-id"]} initialIndex={0}>
        <Provider store={store}>
          <Route path="/editPost/:id">
            <EditPostForm />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { findByText } = render(ui);
    expect(await findByText(/No post found/i)).toBeInTheDocument();
  });

  test("load existing post in the form", async () => {
    const ui = (
      <MemoryRouter initialEntries={["/editPost/1"]} initialIndex={0}>
        <Provider store={store}>
          <Route path="/editPost/:id">
            <EditPostForm />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { findByText, findByDisplayValue } = render(ui);
    expect(await findByDisplayValue(/First test Post/i)).toBeInTheDocument();
    expect(await findByText(/test/i)).toBeInTheDocument();
  });

  test("edit post, submit it with all fields are filled, direct to home page", async () => {
    window.history.pushState({}, "Edit post", "/editPost/1");
    const ui = (
      <BrowserRouter>
        <Provider store={store}>
          <Route path="/editPost/:id">
            <EditPostForm />
          </Route>
        </Provider>
      </BrowserRouter>
    );
    const { getByRole, getByLabelText, findByTestId } = render(ui);
    await findByTestId("title");
    fireEvent.change(getByLabelText("Title"), {
      target: { value: "Updated Title 1" },
    });
    fireEvent.change(getByLabelText("Content"), {
      target: { value: "Updated Content 1" },
    });

    fireEvent.click(getByRole("button"));
    expect(window.location.pathname).toBe("/");
  });
});
