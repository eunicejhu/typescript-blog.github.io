import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Signup from "./Signup";

const mockSignup = jest.fn();
jest.mock("../../hooks/useSignup", () => {
  return () => ({ error: null, signup: mockSignup });
});

test("Signup button is disabled when required input is not filled", () => {
  const { getByDisplayValue } = render(<Signup />);
  expect(getByDisplayValue(/signup/i).disabled).toBeTruthy();
});
test("Signup button is disabled and show warnning message when two passwords are not identical", () => {
  const { container, getByText, getByLabelText, getByDisplayValue } = render(
    <Signup />
  );
  fireEvent.change(getByLabelText(/^password$/i), { target: { value: "***" } });
  fireEvent.change(container.querySelector("#confirm_password"), {
    target: { value: "****" },
  });
  expect(getByDisplayValue(/signup/i).disabled).toBeTruthy();
  expect(getByText(/password is not identical/i).style.display).toBe("block");
});
test("Show 'Identifier is taken'  when Signup failure", () => {
  const { getByText, getByLabelText, getByDisplayValue } = render(<Signup />);
  fireEvent.change(getByLabelText(/email/i), {
    target: { value: "example@gmail.com" },
  });
  fireEvent.change(getByLabelText(/^password$/i), { target: { value: "***" } });
  fireEvent.change(getByLabelText(/confirm password/i), {
    target: { value: "***" },
  });
  fireEvent.click(getByDisplayValue(/signup/i));
  expect(mockSignup).toHaveBeenCalledWith({
    identifier: "example@gmail.com",
    password: "***",
  });
  expect(getByText("Identifier is taken")).toBeInTheDocument();
});
