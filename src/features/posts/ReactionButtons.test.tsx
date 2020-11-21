import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import ReactionButtons from "./ReactionButtons";
import { fetchPosts } from "./postsSlice";
import store from "../../store";
import { INITIAL_STATE } from "../../test/mock_data";
import { unwrapResult } from "@reduxjs/toolkit";

test("render correctly", async () => {
  const ui = (
    <Provider store={store}>
      <ReactionButtons post={INITIAL_STATE.posts.data[0]} />
    </Provider>
  );
  const { asFragment } = render(ui);
  expect(asFragment()).toMatchSnapshot();
});

test("click reaction", async () => {
  const ui = (
    <Provider store={store}>
      <ReactionButtons post={INITIAL_STATE.posts.data[0]} />
    </Provider>
  );
  const { container, findAllByText } = render(ui);
  const ResultAction = await store.dispatch(fetchPosts());
  try {
    unwrapResult(ResultAction);
  } catch (error) {
    console.log(error.message);
  } finally {
    // wait for the update of state after dispatch fetchPosts
    expect(store.getState().posts).toMatchInlineSnapshot(`
      Object {
        "data": Array [
          Object {
            "content": "test!",
            "date": "2020-11-14T16:16:08.493Z",
            "id": "1",
            "reactions": Object {
              "eyes": 0,
              "heart": 4,
              "hooray": 0,
              "rocket": 0,
              "thumbsUp": 0,
            },
            "title": "First test Post!",
            "userId": "1",
          },
          Object {
            "content": "test",
            "date": "2020-11-10T16:16:08.493Z",
            "id": "2",
            "reactions": Object {
              "eyes": 0,
              "heart": 0,
              "hooray": 0,
              "rocket": 0,
              "thumbsUp": 3,
            },
            "title": "Second test Post",
            "userId": "0",
          },
        ],
        "error": undefined,
        "status": "succeeded",
        "updatePostError": undefined,
      }
    `);
    fireEvent.click(container.querySelector("[name=heart]") as Element);
    // wait for the updated state after click
    await findAllByText(/ /i);
    expect(store.getState().posts.data[0].reactions["heart"]).toBe(5);
  }
});
