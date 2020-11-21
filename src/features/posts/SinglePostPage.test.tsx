import React from "react";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import SinglePostPage from "./SinglePostPage";
import store from "../../store/index";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { fetchPosts } from "./postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

test("load no post found if postId does not exist", async () => {
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
  const ResultAction = await store.dispatch(fetchPosts());
  try {
    unwrapResult(ResultAction);
  } catch (error) {
  } finally {
    expect(getByText(/No post found/i)).toBeInTheDocument();
  }
});
test("load post when postId exist", async () => {
  const ui = (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/posts/1", "/posts/2"]} initialIndex={1}>
        <Route path="/posts/:id">
          <SinglePostPage />
        </Route>
      </MemoryRouter>
    </Provider>
  );
  const { getByText } = render(ui);
  const ResultAction = await store.dispatch(fetchPosts());
  try {
    unwrapResult(ResultAction);
  } catch (error) {
  } finally {
    expect(getByText(/Second test Post/i)).toBeInTheDocument();
  }
});
test("click edit of first post , go to /posts/edit/1", async () => {
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
  const ResultAction = await store.dispatch(fetchPosts());
  try {
    unwrapResult(ResultAction);
  } catch (error) {
  } finally {
    fireEvent.click(getByText(/Edit/i));
    expect(window.location.pathname).toBe("/editPost/1");
  }
});
