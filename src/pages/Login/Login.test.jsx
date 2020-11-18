import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";
import useLogin from "../../hooks/useLogin";

jest.mock("../../hooks/useLogin");
const useReducerSpy = jest.spyOn(React, "useReducer");

describe("Login", () => {
  const onSubmit = jest.fn();
  beforeEach(() => {
    onSubmit.mockClear();
    useLogin.mockReturnValue({ login: onSubmit });
  });

  test("Login button is disabled when identifier or password is blank", () => {
    useReducerSpy.mockImplementation(() => [{ error: "" }, jest.fn()]);
    // useLogin.mockReturnValue({ login: onSubmit });
    const { getByDisplayValue } = render(<Login />);
    expect(getByDisplayValue(/login/i).disabled).toBeTruthy();
  });
  test("Display 'Invalid Identifier or password' when incorrect indentifier or password", () => {
    useReducerSpy.mockImplementation(() => [
      { error: "Invalid identifier or password" },
      jest.fn(),
    ]);
    // useLogin.mockReturnValue({ login: onSubmit });
    onSubmit.mockRejectedValueOnce();
    const { container, getByPlaceholderText, getByLabelText } = render(
      <Login />
    );
    const IdentifierInput = getByPlaceholderText(/identifier/i);
    fireEvent.change(IdentifierInput, { target: { value: "Isabella" } });
    expect(IdentifierInput.value).toBe("Isabella");

    const PasswordInput = getByPlaceholderText(/password/i);
    fireEvent.change(PasswordInput, { target: { value: "*******" } });
    expect(PasswordInput.value).toBe("*******");

    const submitButton = getByLabelText("submit");
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith({
      identifier: "Isabella",
      password: "*******",
    });

    fireEvent.change(IdentifierInput, {
      target: { value: "INVALID_IDENTIFIER" },
    });
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith({
      identifier: "INVALID_IDENTIFIER",
      password: "*******",
    });
    expect(container.innerHTML).toMatch(/Invalid identifier or password/i);
  });
  test("Display 'Identifier not found' when not signup yet", () => {
    useReducerSpy.mockImplementation(() => [
      { error: "Identifier not found" },
      jest.fn(),
    ]);
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <Login />
    );
    const IdentifierInput = getByPlaceholderText(/identifier/i);
    const PasswordInput = getByPlaceholderText(/password/i);

    const submitButton = getByDisplayValue(/login/i);
    fireEvent.change(IdentifierInput, {
      target: { value: "NOT_EXIST_IDENTIFIER" },
    });
    fireEvent.change(PasswordInput, {
      target: { value: "*****" },
    });
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith({
      identifier: "NOT_EXIST_IDENTIFIER",
      password: "*****",
    });
    expect(getByText(/Identifier not found/i)).toBeInTheDocument();
  });
});
