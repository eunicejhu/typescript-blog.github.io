import React from "react";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import SinglePostPage from "./SinglePostPage";
import renderWithStore from "../../test/renderWithStore";
import store from "../../store/index";
import renderWithStoreAndRouter from "../../test/renderWithStoreAndRouter";
import { fireEvent } from "@testing-library/react";
import { INITIAL_STATE } from "../../test/mock_data";

jest.mock("../../store/index");
beforeEach(() => {
  jest.clearAllMocks();
});
test("load no post found if postId does not exist", () => {
  store.getState = jest.fn().mockReturnValue(INITIAL_STATE);
  window.history.pushState({}, "Some Post", "/posts/unknown-post");
  const { getByText } = renderWithStore(
    <BrowserRouter>
      <Route path="/posts/:id">
        <SinglePostPage />
      </Route>
    </BrowserRouter>
  );
  expect(getByText(/No post found/i)).toBeInTheDocument();
});
test("load post when postId exist", () => {
  store.getState = jest.fn().mockReturnValue(INITIAL_STATE);
  const { getByText } = renderWithStore(
    <MemoryRouter initialEntries={["/posts/1", "/posts/2"]} initialIndex={1}>
      <Route path="/posts/:id">
        <SinglePostPage />
      </Route>
    </MemoryRouter>
  );

  expect(getByText(/Second test Post/i)).toBeInTheDocument();
});
test("click edit of first post , go to /posts/edit/1", async () => {
  const { getByText } = renderWithStoreAndRouter(
    <Route path="/posts/:id">
      <SinglePostPage />
    </Route>,
    { route: "/posts/1" }
  );
  fireEvent.click(getByText(/Edit/i));
  expect(window.location.pathname).toBe("/editPost/1");
});
