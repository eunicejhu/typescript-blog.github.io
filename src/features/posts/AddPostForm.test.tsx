import React from "react";
import { fireEvent } from "@testing-library/react";
import AddPostForm from "./AddPostForm";
import store from "../../store/index";
import { NOW, INITIAL_STATE } from "../../test/mock_data";

import renderWithStore from "../../test/renderWithStore";

// option1: manually mock store
jest.mock("../../store/index.ts");
store.getState = jest.fn(() => INITIAL_STATE);

jest.mock("@reduxjs/toolkit", () => ({
  ...(jest.requireActual("@reduxjs/toolkit") as {}),
  nanoid: () => "3R8imJks0AjrbC9ueNf_s",
}));

jest.mock("../../utils/getNowTimeStamps.ts", () =>
  jest.fn().mockReturnValue("2020-11-15T16:16:08.493Z")
);

beforeEach(() => {
  jest.clearAllMocks();
});

test("type text in title and content input, select a user from the dropdown of users, click save post button to add a post", () => {
  const { getByTestId, getByRole } = renderWithStore(<AddPostForm />, {
    store,
  });
  fireEvent.change(getByTestId("title"), { target: { value: "Title 3" } });
  fireEvent.change(getByTestId("content"), { target: { value: "Content 3" } });
  fireEvent.change(getByTestId("users"), { target: { value: "2" } });
  fireEvent.click(getByRole("button"));
  expect(store.dispatch).toHaveBeenCalledWith({
    type: "posts/postAdded",
    payload: {
      id: "3R8imJks0AjrbC9ueNf_s",
      title: "Title 3",
      content: "Content 3",
      userId: "2",
      date: NOW,
    },
  });
});

// option2: use customRender
test("Both title, content and userId should be provided to enable the submission", () => {
  const { getByTestId, getByRole } = renderWithStore(<AddPostForm />, {
    store,
  });
  fireEvent.change(getByTestId("title"), { target: { value: "Title 1" } });

  fireEvent.click(getByRole("button"));
  expect(getByRole("button").disabled).toBeTruthy();
  fireEvent.change(getByTestId("content"), {
    target: { value: "Content 1" },
  });
  fireEvent.click(getByRole("button"));
  expect(store.dispatch).toHaveBeenCalledTimes(0);
  fireEvent.change(getByTestId("users"), { target: { value: "1" } });
  fireEvent.click(getByRole("button"));
  expect(store.dispatch).toHaveBeenCalledTimes(1);
});
