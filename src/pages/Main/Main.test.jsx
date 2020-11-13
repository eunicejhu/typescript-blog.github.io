import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import Main from "./Main";
import history from "../../helpers/history";
import withRouter from "../../test/withRouter";
import withTheme, { theme } from "../../test/withTheme";

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
  const MainWithRouterTheme = withTheme(withRouter(Main));
  render(<MainWithRouterTheme />);
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

test("ThemeButton: show light after dark button", () => {
  const ThemeButton = screen.getByText("dark");
  fireEvent.click(ThemeButton);
  expect(theme.setTheme).toHaveBeenCalledWith("light");
});
