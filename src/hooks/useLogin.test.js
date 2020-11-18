import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import useLogin from "./useLogin";
import { AUTH_STATUS } from "../reducers/authReducer";

jest.mock("react-cookie", () => ({ useCookies: jest.fn() }));
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
}));

const dispatch = jest.fn();

describe(",", () => {
  const setCookie = jest.fn();
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("AUTH_SUCCESS dispatched, cookie updated, redirect to home page after login success,", async () => {
    useCookies.mockReturnValue([null, setCookie]);
    axios.post = jest.fn().mockResolvedValue({
      data: { id: 1, username: "isabella" },
      status: 200,
    });
    useHistory.mockReturnValue({ replace });
    // renderHook, login
    const { result, waitForNextUpdate } = renderHook(() => useLogin(dispatch));
    result.current.login("isabella", "****");
    try {
      await waitForNextUpdate({ timeout: 100 });
    } catch (error) {
    } finally {
      expect(dispatch).toHaveBeenCalledWith({
        type: "AUTH_SUCCESS",
        payload: { id: 1, username: "isabella" },
      });
      expect(setCookie).toHaveBeenLastCalledWith(
        "auth",
        { id: 1, username: "isabella" },
        { path: "/" }
      );
      expect(replace).toHaveBeenLastCalledWith("/");
    }
  });
  test("Dispatch LOGIN_FAILURE when login fails", async () => {
    useCookies.mockReturnValue([null, setCookie]);
    axios.post.mockRejectedValueOnce("login error");
    const { result, waitForNextUpdate } = renderHook(() => useLogin(dispatch));
    result.current.login({ identifier: "isabella", password: "****" });
    try {
      await waitForNextUpdate({ timeout: 100 });
    } catch (error) {
    } finally {
      expect(dispatch).toHaveBeenLastCalledWith({
        type: AUTH_STATUS.ERROR,
        payload: "Invalid Identifier or password",
      });
    }
  });
});
