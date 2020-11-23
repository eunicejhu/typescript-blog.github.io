import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import PostsList from "./PostsList";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/index";
import { fetchPosts } from "./postsSlice";

import { makeServer } from "../../server";
import { Server, Response } from "miragejs";

let server: Server;
describe("PostsList test:", () => {
  beforeAll(() => {
    console.error = jest.fn();
  });
  beforeEach(() => {
    server = makeServer();
    server.createList("post", 2);
  });
  afterEach(() => {
    server.shutdown();
  });
  test("show initial postsList", async () => {
    const ui = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Route exact path="/">
            <PostsList />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { container, findByText } = render(ui);
    expect(await findByText(/First test Post/i)).toBeInTheDocument();
    expect(store.getState().posts.data.length).toBe(2);

    expect(container.querySelectorAll(".post-excerpt").length).toBe(2);
  });

  test("click Seemore of first post direct to SinglePostPage", async () => {
    window.history.pushState({}, "Posts List", "/");
    const ui = (
      <BrowserRouter>
        <Provider store={store}>
          <Route exact path="/">
            <PostsList />
          </Route>
        </Provider>
      </BrowserRouter>
    );
    const { findAllByText } = render(ui);

    const firstPostSeeMoreButton = (await findAllByText(/See more/i))[0];
    fireEvent.click(firstPostSeeMoreButton);
    expect(window.location.pathname).toBe("/posts/1");
  });
  test("show no posts when posts is []", async () => {
    server.get("/posts", () => {
      return { posts: [] };
    });
    const ui = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Route exact path="/">
            <PostsList />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { findByText } = render(ui);
    store.dispatch(fetchPosts());
    expect(await findByText(/No Post/i)).toBeInTheDocument();
    expect(store.getState().posts.data.length).toBe(0);
  });

  test("what happen when server 400", async () => {
    server.get("/posts", () => {
      return new Response(
        400,
        { some: "header" },
        { errors: ["name cannot be blank"] }
      );
    });
    const ui = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Route exact path="/">
            <PostsList />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { findByText } = render(ui);
    store.dispatch(fetchPosts());
    expect(await findByText(/Failed to fetch posts/i)).toBeInTheDocument();
    expect(store.getState().posts.data.length).toBe(0);
  });
});
