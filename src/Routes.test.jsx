import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import Routes from "./Routes.tsx";
import renderWithStoreAndRouter from "./test/renderWithStoreAndRouter";
import renderWithBrowserRouter from "./test/renderWithBrowserRouter.tsx";
import BrowserRouterWrapper from "./test/BrowserRouterWrapper.tsx";
import StoreWrapper from "./test/StoreWrapper";

// It provides 3 ways to wrap App with router for testing.

// wrap it with Router providing history. in case we need history
test("route / load PostList page", () => {
  const history = createMemoryHistory({ initialEntries: ["/inital"] });
  history.push("/");
  const { container } = render(
    <MemoryRouter initialEntries={["/inital", "/"]} initialIndex={1}>
      <StoreWrapper>
        <Routes />
      </StoreWrapper>
    </MemoryRouter>
  );
  expect(container.querySelectorAll("article").length).toBe(2);
});

test("route /posts/1 load SinglePostPage", () => {
  renderWithStoreAndRouter(<Routes />, { route: "/posts/1" });
  expect(screen.getByText(/First test Post!/i)).toBeInTheDocument();
});

test("route /posts/edit/1 load EditPostForm", () => {
  renderWithStoreAndRouter(<Routes />, { route: "/editPost/1" });
  expect(screen.getByText(/Edit Post/i)).toBeInTheDocument();
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
