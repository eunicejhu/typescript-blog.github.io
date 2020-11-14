import React from "react";
import renderer from "react-test-renderer";
import StoreWrapper from "../../test/StoreWrapper";
import PostsList from "./PostsList";
import renderWithStore, { INITIAL_STATE } from "../../test/renderWithStore";

test("show initial postsList", () => {
  const { container, getByText } = renderWithStore(<PostsList />, {
    initialState: INITIAL_STATE,
  });
  expect(getByText(/First test Post!/i)).toBeInTheDocument();
  expect(container.querySelectorAll(".post-excerpt").length).toBe(2);
});

test("show no posts when posts is []", () => {
  const { getByText } = renderWithStore(<PostsList />, {
    initialState: { posts: [] },
  });
  expect(getByText(/No Posts/i)).toBeInTheDocument();
});

test("render correctly", () => {
  const tree = renderer
    .create(
      <StoreWrapper>
        <PostsList />
      </StoreWrapper>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
