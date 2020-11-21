import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./store/index";

const withMemoryRouterAndStore = (ui: React.ReactNode, route: string) => (
  <MemoryRouter initialEntries={[route]} initialIndex={0}>
    <Provider store={store}>{ui}</Provider>
  </MemoryRouter>
);
// wrap it with Router providing history. in case we need history
test("route / load PostList page", async () => {
  const ui = withMemoryRouterAndStore(<Routes />, "/");
  const { findByText } = render(ui);
  expect(await findByText("Posts")).toBeInTheDocument();
});

test("route /posts/1 load SinglePostPage", () => {
  const ui = withMemoryRouterAndStore(<Routes />, "/posts/1");
  const { getByText } = render(ui);
  expect(getByText(/No post found/i)).toBeInTheDocument();
});

test("route /posts/edit/1 load EditPostForm", async () => {
  const ui = withMemoryRouterAndStore(<Routes />, "/editPost/1");
  const { findByText } = render(ui);
  expect(await findByText(/Edit Post/i)).toBeInTheDocument();
});

test("route /notifications load NotificationsList", async () => {
  const ui = withMemoryRouterAndStore(<Routes />, "/notifications");
  const { findByText } = render(ui);
  expect(await findByText(/Notifications List/i)).toBeInTheDocument();
});

test("load No Match when unknown route", () => {
  const ui = withMemoryRouterAndStore(<Routes />, "/unknown-route");
  const { getByText } = render(ui);

  expect(getByText(/No match/i)).toBeInTheDocument();
});
