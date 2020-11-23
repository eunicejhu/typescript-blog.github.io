import React from "react";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import SinglePostPage from "./SinglePostPage";
import store from "../../store/index";
import { fireEvent, render } from "@testing-library/react";
// eslint-disable-next-line testing-library/no-dom-import
import { waitFor } from "@testing-library/dom";
import { Provider } from "react-redux";
import { fetchPosts } from "./postsSlice";

import { makeServer } from "../../server";
import { Server } from "miragejs";

describe("SinglePostPage test", () => {
  let server: Server;
  beforeEach(() => {
    server = makeServer();
    server.createList("post", 2);
    store.dispatch(fetchPosts());
  });
  afterEach(() => {
    server.shutdown();
  });
  it("load no post found if postId does not exist", async () => {
    await waitFor(() => {
      expect(store.getState().posts.data.length).toBe(2);
    });
    const ui = (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/posts/unknown-post"]} initialIndex={0}>
          <Route path="/posts/:id">
            <SinglePostPage />
          </Route>
        </MemoryRouter>
      </Provider>
    );
    const { getByText } = render(ui);
    expect(getByText(/No post found/i)).toBeInTheDocument();
  });
  it("load post when postId exist", async () => {
    await waitFor(() => {
      expect(store.getState().posts.data.length).toBe(2);
    });
    const ui = (
      <Provider store={store}>
        <MemoryRouter
          initialEntries={["/posts/1", "/posts/2"]}
          initialIndex={1}
        >
          <Route path="/posts/:id">
            <SinglePostPage />
          </Route>
        </MemoryRouter>
      </Provider>
    );
    const { getByText } = render(ui);
    expect(getByText(/Second test Post/i)).toBeInTheDocument();
  });
  it("click edit of first post , go to /posts/edit/1", async () => {
    await waitFor(() => {
      expect(store.getState().posts.data.length).toBe(2);
    });
    // pushState should happen before render ui
    window.history.pushState({}, "Post page", "/posts/1");
    const ui = (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/posts/:id">
            <SinglePostPage />
          </Route>
        </BrowserRouter>
      </Provider>
    );
    const { getByText } = render(ui);

    fireEvent.click(getByText(/Edit/i));
    expect(window.location.pathname).toBe("/editPost/1");
  });
});
