import React from "react";
import { render } from "@testing-library/react";
import StoreWrapper from "../../test/StoreWrapper.tsx";
import PostsList from "./PostsList";

jest.mock("react-redux", () => {
  return {
    useSelector: jest
      .fn()
      .mockImplementationOnce(jest.requireActual("react-redux").useSelector)
      .mockImplementationOnce(() => [])
      .mockImplementationOnce(() => undefined),
    Provider: jest.requireActual("react-redux").Provider,
  };
});

test("show initial postsList", () => {
  const { container, getByText } = render(<PostsList />, {
    wrapper: StoreWrapper,
  });
  expect(getByText(/First test Post!/i)).toBeInTheDocument();
  expect(container.querySelectorAll(".post-excerpt").length).toBe(2);
});

test("show no posts when posts is []", () => {
  const { getByText } = render(<PostsList />, {
    wrapper: StoreWrapper,
  });
  expect(getByText(/No Posts/i)).toBeInTheDocument();
});
test("show no posts when posts is undefined", () => {
  const { getByText } = render(<PostsList />, {
    wrapper: StoreWrapper,
  });
  expect(getByText(/No Posts/i)).toBeInTheDocument();
});
