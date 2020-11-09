import { renderHook, cleanup } from "@testing-library/react-hooks";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useLogin from "./useLogin";
import { AUTH_STATUS } from "../reducers/authReducer";

jest.mock("react-cookie", () => {
  return { useCookies: jest.fn() };
});
jest.mock("react-router-dom", () => {
  return { useHistory: jest.fn() };
});
jest.mock("axios");

const dispatch = jest.fn();

describe("login success", () => {
  const setCookie = jest.fn();
  const replace = jest.fn();

  beforeAll(() => {
    axios.post.mockResolvedValue({
      data: { id: 1, username: "isabella" },
      status: 200,
    });
    useCookies.mockImplementation(() => [null, setCookie]);
    useHistory.mockImplementation(() => ({ replace }));
  });
  beforeEach(async () => {
    // renderHook, login
    const { result, waitForNextUpdate } = renderHook(() => useLogin(dispatch));
    result.current.login("isabella", "****");
    try {
      await waitForNextUpdate({ timeout: 100 });
    } catch (error) {
      expect(error.timeout).toBeTruthy();
    }
  });
  afterEach(() => {
    cleanup();
  });

  test("Dispatch LOGIN_SUCCESS", async () => {
    expect(dispatch).toHaveBeenCalledWith({
      type: "AUTH_SUCCESS",
      payload: { id: 1, username: "isabella" },
    });
  });
  test("Store user into Cookie", async () => {
    expect(setCookie).toHaveBeenLastCalledWith(
      "auth",
      { id: 1, username: "isabella" },
      { path: "/" }
    );
  });
  test("Redirect to Home", () => {
    expect(replace).toHaveBeenLastCalledWith("/");
  });
});

describe("login failure", () => {
  beforeAll(() => {
    axios.post.mockRejectedValueOnce("login error");
  });

  afterAll(() => {
    cleanup();
  });
  test("Dispatch LOGIN_FAILURE", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLogin(dispatch));
    result.current.login({ identifier: "isabella", password: "****" });
    try {
      await waitForNextUpdate({ timeout: 100 });
    } catch (error) {
      expect(error.timeout).toBeTruthy();
      expect(dispatch).toHaveBeenLastCalledWith({
        type: AUTH_STATUS.ERROR,
        payload: "Invalid Identifier or password",
      });
    }
  });
});
