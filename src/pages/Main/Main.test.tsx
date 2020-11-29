import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import { useCookies } from "react-cookie";
import Main from "./Main";
import history from "../../helpers/history";
import withRouter from "../../test/withRouter";
import withTheme, { theme } from "../../test/withTheme";

jest.mock("react-cookie");

test("display Login link when user is not logged in", () => {
    useCookies.mockReturnValue([{ isLoggedIn: false }]);
    const MainWithRouterTheme = withTheme(withRouter(Main));
    render(<MainWithRouterTheme />);
    const LoginLink = screen.getByTestId("/login");
    expect(LoginLink.innerHTML).toBe("Login");
});

test("display Logout link when user is logged in", () => {
    useCookies.mockReturnValue([{ isLoggedIn: true }]);
    const MainWithRouterTheme = withTheme(withRouter(Main));
    render(<MainWithRouterTheme />);
    const LoginLink = screen.getByTestId("/login");
    expect(LoginLink.innerHTML).toBe("Logout");
});

test("redirect to Home when click logout", () => {
    useCookies.mockReturnValue([{ isLoggedIn: true }, jest.fn()]);
    const MainWithRouterTheme = withTheme(withRouter(Main));
    render(<MainWithRouterTheme />);
    const LogoutLink = screen.getByTestId("/login");
    expect(LogoutLink.innerHTML).toBe("Logout");
    fireEvent.click(LogoutLink);
    expect(history.location.pathname).toBe("/");
});
