import { screen, fireEvent } from "@testing-library/react";
import PortfolioPage from "../pages/PortfolioPage";
import renderInRouter from "./renderInRouter";
import history from "../helpers/history";

jest.mock("react-cookie", () => {
  const mockSetCookie = jest.fn();
  const useCookies = jest
    .fn()
    .mockReturnValueOnce([{ isLoggedIn: false }])
    .mockReturnValueOnce([{ isLoggedIn: true }])
    .mockReturnValue([{ isLoggedIn: true }, mockSetCookie]);
  return { useCookies };
});

beforeEach(() => {
  renderInRouter(PortfolioPage);
});

test("display Login link when user is not logged in", () => {
  const LoginLink = screen.getByTestId("/login");
  expect(LoginLink.innerHTML).toBe("Login");
});

test("display Logout link when user is logged in", () => {
  const LoginLink = screen.getByTestId("/login");
  expect(LoginLink.innerHTML).toBe("Logout");
});

test("redirect to Home when click logout", () => {
  const LogoutLink = screen.getByTestId("/login");
  expect(LogoutLink.innerHTML).toBe("Logout");
  fireEvent.click(LogoutLink);
  expect(history.location.pathname).toBe("/");
});
