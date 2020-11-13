import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Routes from "./Routes";
import renderWithBrowserRouter from "./test/renderWithBrowserRouter.tsx";
import BrowserRouterWrapper from "./test/BrowserRouterWrapper.tsx";

// It provides 3 ways to wrap App with router for testing.

// wrap it with Router providing history. in case we need history
test("route / load PostList page", () => {
  const history = createMemoryHistory({ initialEntries: ["/inital"] });
  history.push("/");
  const { getByText } = render(
    <Router history={history}>
      <Routes />
    </Router>
  );
  expect(getByText(/Post/i)).toBeInTheDocument();
});

// in case we don't need history, we can use renderWithRouter boilerplate
test("route /cats load Cats page", () => {
  renderWithBrowserRouter(<Routes />, { route: "/cats" });
  expect(screen.getByText(/Cats/i)).toBeInTheDocument();
});

// BrowserRouterWrapper expose window globals by default,
test("load No Match when unknown route", () => {
  window.history.pushState({}, "Unknown page", "/unknown-route");
  render(<Routes />, { wrapper: BrowserRouterWrapper });

  expect(screen.getByText(/No match/i)).toBeInTheDocument();
});
