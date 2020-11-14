import React from "react";
import { MemoryRouter, Route, BrowserRouter, Router } from "react-router-dom";
import SinglePostPage from "./SinglePostPage";
import renderWithStore from "../../test/renderWithStore";

test("load no post found if postId does not exist", () => {
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
  const { getByText } = renderWithStore(
    <MemoryRouter initialEntries={["/posts/1", "/posts/2"]} initialIndex={1}>
      <Route path="/posts/:id">
        <SinglePostPage />
      </Route>
    </MemoryRouter>,
    {
      initialState: {
        posts: [
          { id: "1", title: "First test Post!", content: "test!" },
          { id: "2", title: "Second test Post", content: "test" },
          { id: "3", title: "Third test Post", content: "test" },
        ],
      },
    }
  );

  expect(getByText(/Second test Post/i)).toBeInTheDocument();
});
