import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

const withBrowserRouterAndStore = (ui: React.ReactNode, route = "/initial") => {
  window.history.pushState({}, "", route);
  return (
    <BrowserRouter>
      <Provider store={store}>{ui}</Provider>
    </BrowserRouter>
  );
};
test("click Home, location pathname set to /", () => {
  const ui = withBrowserRouterAndStore(<NavBar />);
  render(ui);
  fireEvent.click(screen.getByText(/Home/i));
  expect(window.location.pathname).toBe("/");
});
test("click Notifications, location pathname set to /notifications", () => {
  const ui = withBrowserRouterAndStore(<NavBar />);
  render(ui);
  fireEvent.click(screen.getByText(/Notifications/i));
  expect(window.location.pathname).toBe("/notifications");
});

test("renders correctly", () => {
  const ui = withBrowserRouterAndStore(<NavBar />);
  const { asFragment } = render(ui);

  expect(asFragment()).toMatchSnapshot();
});
