import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import PortfolioPage from "../pages/PortfolioPage";

jest.mock("react-cookie", () => {
  const useCookies = jest.fn().mockReturnValueOnce([{isLoggedIn: false}]).mockReturnValueOnce([{isLoggedIn: true}])
  return {useCookies}
})

test("display Login link when user is not logged in", () => {
  const { container, getByTestId } = render(
    <MemoryRouter>
      <PortfolioPage />
    </MemoryRouter>
  );
  const LoginLink = getByTestId("/login");
  expect(LoginLink.innerHTML).toBe("Login");
});

test("display Logout link when user is logged in", () => {
  const { container, getByTestId } = render(
    <MemoryRouter>
      <PortfolioPage />
    </MemoryRouter>
  );
  const LoginLink = getByTestId("/login");
  expect(LoginLink.innerHTML).toBe("Logout");
});
