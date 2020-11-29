import React from "react";
import { fireEvent, render } from "@testing-library/react";
// eslint-disable-next-line testing-library/no-dom-import
import { waitFor } from "@testing-library/dom";
import { Provider } from "react-redux";
import ReactionButtons from "./ReactionButtons";
import { fetchPosts } from "./postsSlice";
import store from "../../store";

import { makeServer } from "../../server";
import { Server } from "miragejs";
let server: Server;
describe("ReactionButtons test", () => {
  beforeEach(() => {
    server = makeServer();
    server.createList("post", 2);
    store.dispatch(fetchPosts());
  });
  afterEach(() => {
    server.shutdown();
  });
  it("render correctly", async () => {
    await waitFor(() => {
      expect(store.getState().posts.data.length).toBe(2);
    });
    const post = store.getState().posts.data[0];
    const ui = (
      <Provider store={store}>
        <ReactionButtons post={post} />
      </Provider>
    );
    const { asFragment } = render(ui);
    expect(asFragment()).toMatchSnapshot();
  });

  it("click reaction", async () => {
    await waitFor(() => {
      expect(store.getState().posts.data.length).toBe(2);
    });
    let post;
    post = store.getState().posts.data[0];
    const ui = (
      <Provider store={store}>
        <ReactionButtons post={post} />
      </Provider>
    );
    const { getByTestId, rerender } = render(ui);
    const heartButton = getByTestId("heart");

    fireEvent.click(heartButton);
    await waitFor(() => {
      expect(store.getState().posts.data[0].reactions["heart"]).toBe(5);
    });

    // get updated post from store
    post = store.getState().posts.data[0];
    rerender(
      <Provider store={store}>
        <ReactionButtons post={post} />
      </Provider>
    );
    await waitFor(() => {
      expect(heartButton).toHaveTextContent(/5/i);
    });
  });
});
