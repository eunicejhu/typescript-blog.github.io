import React from "react";
import { fireEvent, render } from "@testing-library/react";
import PostsList from "./PostsList";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/index";
import Client from "../../api/client";
import { INITIAL_STATE } from "../../test/mock_data";
import { fetchPosts } from "./postsSlice";

jest.mock("../../api/client");

describe("PostsList test:", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("show initial postsList", async () => {
    Client.fetchPost = jest
      .fn()
      .mockResolvedValueOnce({ data: INITIAL_STATE.posts.data });

    const ui = (
      <MemoryRouter initialEntries={["/posts"]} initialIndex={0}>
        <Provider store={store}>
          <Route exact path="/posts">
            <PostsList />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { container, findByText } = render(ui);
    expect(await findByText(/First test Post!/i)).toBeInTheDocument();
    expect(store.getState().posts.data.length).toBe(2);

    expect(container.querySelectorAll(".post-excerpt").length).toBe(2);
  });

  test("click Seemore of first post direct to SinglePostPage", async () => {
    Client.fetchPost = jest
      .fn()
      .mockResolvedValueOnce({ data: INITIAL_STATE.posts.data });
    window.history.pushState({}, "Posts List", "/posts");
    const ui = (
      <BrowserRouter>
        <Provider store={store}>
          <Route exact path="/posts">
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
    Client.fetchPost = jest.fn().mockResolvedValueOnce({ data: [] });
    const ui = (
      <MemoryRouter initialEntries={["/posts"]} initialIndex={0}>
        <Provider store={store}>
          <Route exact path="/posts">
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
});
