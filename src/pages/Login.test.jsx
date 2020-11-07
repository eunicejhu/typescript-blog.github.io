import React from "react";
import { render, fireEvent } from "@testing-library/react";
// eslint-disable-next-line import/named
import { mockLogin } from "../hooks/useLogin";
import Login from "./Login";

jest.mock("../hooks/useLogin");

test("get ***@gmail.com when set ***@gmail.com to Identifier input", () => {
  const { container } = render(<Login />);
  const identifier = container.querySelector("#identifier");
  fireEvent.change(identifier, { target: { value: "***@gmail.com" } });
  expect(identifier.getAttribute("value")).toBe("***@gmail.com");
});

test("get ***** when set ***** to Password input", () => {
  const { container } = render(<Login />);
  const password = container.querySelector("#password");
  fireEvent.change(password, { target: { value: "*****" } });
  expect(password.value).toBe("*****");
});

test("Fail to submit when password is not filled", () => {
  const onSubmit = jest.fn();
  const { getByTestId, container } = render(<Login cb={onSubmit} />);
  const identifier = container.querySelector("#identifier");
  const submitBtn = getByTestId("submit");

  fireEvent.change(identifier, { target: { value: "some identifier" } });
  fireEvent.submit(submitBtn);
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

test("Fail to submit when identifier is not filled", () => {
  const onSubmit = jest.fn();
  const { getByTestId, container } = render(<Login cb={onSubmit} />);
  const password = container.querySelector("[name=password]");
  const submitBtn = getByTestId("submit");

  fireEvent.change(password, { target: { value: "****" } });
  fireEvent.submit(submitBtn);
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

test("Succeed to submit when identifier and password are both filled", () => {
  const { getByTestId, container } = render(<Login />);
  const identifier = container.querySelector("#identifier");
  const password = container.querySelector("[name=password]");
  const submitBtn = getByTestId("submit");

  fireEvent.change(identifier, { target: { value: "some identifier" } });
  fireEvent.change(password, { target: { value: "****" } });
  fireEvent.submit(submitBtn);
  expect(mockLogin).toHaveBeenCalledWith({
    identifier: "some identifier",
    password: "****",
  });
});
