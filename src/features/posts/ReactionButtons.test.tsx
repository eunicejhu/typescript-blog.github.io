import React from "react";
import { fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import ReactionButtons from "./ReactionButtons";
import { INITIAL_STATE } from "../../test/mock_data";
import renderWithStoreAndRouter from "../../test/renderWithStoreAndRouter";
import { reactionAdded } from "./postsSlice";

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: jest.fn(),
}));
jest.mock("./postsSlice.ts", () => ({
  ...(jest.requireActual("./postsSlice.ts") as {}),
  reactionAdded: jest.fn(),
}));

test("render correctly", () => {
  const { asFragment } = renderWithStoreAndRouter(
    <ReactionButtons post={INITIAL_STATE.posts.data[0]} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("click reaction", async () => {
  const dispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatch);
  const { container } = renderWithStoreAndRouter(
    <ReactionButtons post={INITIAL_STATE.posts.data[0]} />
  );
  fireEvent.click(container.querySelector("[name=heart]") as Element);
  expect(dispatch).toHaveBeenCalled();
  expect(reactionAdded).toHaveBeenCalled();
});
