import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, screen } from "@testing-library/react";
import StoreWrapper from "../../test/StoreWrapper";
import PostsList from "./PostsList";
import { INITIAL_STATE } from "../../test/mock_data";
import renderWithStoreAndRouter from "../../test/renderWithStoreAndRouter";
import BrowserRouterWrapper from "../../test/BrowserRouterWrapper.tsx";

test("show initial postsList", () => {
  const { container, getByText } = renderWithStoreAndRouter(<PostsList />, {
    initialState: INITIAL_STATE,
  });
  expect(getByText(/First test Post!/i)).toBeInTheDocument();
  expect(container.querySelectorAll(".post-excerpt").length).toBe(2);
});

test("click Seemore direct to SinglePostPage", () => {
  const { getAllByText } = renderWithStoreAndRouter(<PostsList />, {
    initialState: INITIAL_STATE,
  });
  fireEvent.click(getAllByText(/See more/i)[0]);
  expect(screen.getByText("First test Post!")).toBeInTheDocument();
});

test("show no posts when posts is []", () => {
  const { getByText } = renderWithStoreAndRouter(<PostsList />, {
    initialState: { posts: [] },
  });
  expect(getByText(/No Posts/i)).toBeInTheDocument();
});

test("render correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouterWrapper>
        <StoreWrapper>
          <PostsList />
        </StoreWrapper>
      </BrowserRouterWrapper>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
