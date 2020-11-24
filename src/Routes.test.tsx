import React from "react";
import { render } from "@testing-library/react";
// eslint-disable-next-line testing-library/no-dom-import
import { waitFor } from "@testing-library/dom";
import { MemoryRouter } from "react-router-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./store/index";

import { makeServer } from "./server";
import { Server } from "miragejs";
import { fetchPosts } from "./features/posts/postsSlice";

describe("Routes test", () => {
  let server: Server;
  beforeEach(() => {
    server = makeServer();
  });
  afterEach(() => {
    server.shutdown();
  });
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

  it("route /posts/edit/1 load EditPostForm", async () => {
    server.createList("post", 2);
    store.dispatch(fetchPosts());
    await waitFor(() => {
      expect(store.getState().posts.data.length).toBe(2);
    });
    const ui = withMemoryRouterAndStore(<Routes />, "/editPost/1");
    const { getByText } = render(ui);
    await waitFor(async () => {
      expect(getByText(/Edit Post/i)).toBeInTheDocument();
    });
  });

  test("route /notifications load NotificationsList", async () => {
    const ui = withMemoryRouterAndStore(<Routes />, "/notifications");
    const { getByText } = render(ui);
    await waitFor(() => {
      expect(getByText(/Notifications List/i)).toBeInTheDocument();
    });
  });

  test("load No Match when unknown route", () => {
    const ui = withMemoryRouterAndStore(<Routes />, "/unknown-route");
    const { getByText } = render(ui);

    expect(getByText(/No match/i)).toBeInTheDocument();
  });
});
