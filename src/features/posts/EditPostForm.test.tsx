import EditPostForm from "./EditPostForm";
import React from "react";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
// eslint-disable-next-line testing-library/no-dom-import
import { waitFor } from "@testing-library/dom";
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

  it("load existing post in the form", async () => {
    const ui = (
      <MemoryRouter initialEntries={["/editPost/1"]} initialIndex={0}>
        <Provider store={store}>
          <Route path="/editPost/:id">
            <EditPostForm />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { findByTestId } = render(ui);

    await waitFor(() => {
      expect(store.getState().posts.data.length).toBe(2);
    });
    const titleInput = (await findByTestId("title")) as HTMLInputElement;
    const contentTextArea = (await findByTestId(
      "content"
    )) as HTMLTextAreaElement;

    await waitFor(() => {
      expect(titleInput.value).toBe("First test Post");
      expect(contentTextArea.value).toBe("test");
    });
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
    const { getByRole, getByLabelText } = render(ui);

    await waitFor(() => expect(store.getState().posts.data.length).toBe(2));

    const titleInput = getByLabelText("Title");
    const contentTextArea = getByLabelText("Content");
    const saveButton = getByRole("button");
    fireEvent.change(titleInput, {
      target: { value: "Updated Title 1" },
    });
    fireEvent.change(contentTextArea, {
      target: { value: "Updated Content 1" },
    });
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(
        store.getState().posts.data.find((post) => post.id === "1")?.title
      ).toBe("Updated Title 1")
    );
    expect(window.location.pathname).toBe("/posts/1");
  });
});
