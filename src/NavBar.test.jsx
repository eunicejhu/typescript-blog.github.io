import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import NavBar from "./NavBar";
import BrowserRouterWrapper from "./test/BrowserRouterWrapper.tsx";

test("click Home, location pathname set to /", () => {
  render(<NavBar />, { wrapper: BrowserRouterWrapper });
  fireEvent.click(screen.getByText(/Home/i));
  expect(window.location.pathname).toBe("/");
});

test("click Cats, location pathname set to /cats ", () => {
  render(<NavBar />, { wrapper: BrowserRouterWrapper });
  fireEvent.click(screen.getByText(/Cats/i));
  expect(window.location.pathname).toBe("/cats");
});

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouterWrapper>
        <NavBar />
      </BrowserRouterWrapper>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
