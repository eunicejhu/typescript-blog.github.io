import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import PostsList from "./PostsList";
import { INITIAL_STATE, EMPTY_STATE } from "../../test/mock_data";
import renderWithStoreAndRouter from "../../test/renderWithStoreAndRouter";

test("show initial postsList", async () => {
  const { container, findByText } = renderWithStoreAndRouter(<PostsList />, {
    initialState: INITIAL_STATE,
  });
  expect(await findByText(/First test Post!/i)).toBeInTheDocument();
  expect(container.querySelectorAll(".post-excerpt").length).toBe(2);
});

test("click Seemore direct to SinglePostPage", async () => {
  const { findAllByText } = renderWithStoreAndRouter(<PostsList />, {
    initialState: INITIAL_STATE,
  });
  const seeMoreButton = (await findAllByText(/See more/i))[0];
  fireEvent.click(seeMoreButton);
  expect(screen.getByText("First test Post!")).toBeInTheDocument();
});

test("show no posts when posts is []", async () => {
  const { findByText } = renderWithStoreAndRouter(<PostsList />, {
    initialState: EMPTY_STATE,
  });
  expect(await findByText(/No Post/i)).toBeInTheDocument();
});
