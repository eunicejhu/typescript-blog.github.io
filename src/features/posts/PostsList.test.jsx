import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import PostsList from "./PostsList.tsx";
import { INITIAL_STATE } from "../../test/mock_data";
import renderWithStoreAndRouter from "../../test/renderWithStoreAndRouter";

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
