import React from "react";
import { fireEvent } from "@testing-library/react";
import AddPostForm from "./AddPostForm.tsx";
import store from "../../store/index.ts";

import renderWithStore from "../../test/renderWithStore";

// option1: manually mock store
jest.mock("../../store");
jest.mock("@reduxjs/toolkit", () => ({
  ...jest.requireActual("@reduxjs/toolkit"),
  nanoid: () => "3R8imJks0AjrbC9ueNf_s",
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("submit AddPostForm after title and content provided", () => {
  const { getByTestId, getByRole } = renderWithStore(<AddPostForm />, {
    store,
  });
  fireEvent.change(getByTestId("title"), { target: { value: "Title 1" } });
  fireEvent.change(getByTestId("content"), { target: { value: "Content 1" } });
  fireEvent.click(getByRole("submit"));
  expect(store.dispatch).toHaveBeenCalledWith({
    type: "posts/postAdded",
    payload: {
      id: "3R8imJks0AjrbC9ueNf_s",
      title: "Title 1",
      content: "Content 1",
    },
  });
});
// option2: use customRender
test("Both title and content should be provided to enable the submission", () => {
  const { getByTestId, getByRole } = renderWithStore(<AddPostForm />, {
    store,
  });
  fireEvent.change(getByTestId("title"), { target: { value: "Title 1" } });

  fireEvent.click(getByRole("submit"));
  expect(store.dispatch).toHaveBeenCalledTimes(0);
  fireEvent.change(getByTestId("content"), {
    target: { value: "Content 1" },
  });
  fireEvent.click(getByRole("submit"));
  expect(store.dispatch).toHaveBeenCalledTimes(1);
});
