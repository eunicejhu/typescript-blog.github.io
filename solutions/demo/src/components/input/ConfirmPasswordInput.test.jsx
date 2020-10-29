import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { fireEvent } from "@testing-library/react";
import { getByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import { ConfirmPasswordInputFC } from "./ConfirmPasswordInput";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("validate value when input password", () => {
  //   act(() => {
  //     render(<ConfirmPasswordInput />, container);
  //   });
  //   const passwordInput = container.querySelector("#password");
  //   act(() => {
  //     passwordInput.dispatchEvent(new UIEvent("change", { bubbles: true }));
  //   });
});

it("cannot handle confirm if password is not identical", () => {
  const handleConfirm = jest.fn();
  act(() => {
    render(<ConfirmPasswordInputFC handleConfirm={handleConfirm} />, container);
  });
  const passwordInput = getByTestId(container, "password");
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  const confirmPasswordInput = getByTestId(container, "password_confirmation");
  fireEvent.change(confirmPasswordInput, { target: { value: "12345" } });

  expect(handleConfirm).toHaveBeenCalledTimes(0);
});
it("able to  handle confirm if password is identical", () => {
  const handleConfirm = jest.fn();
  act(() => {
    render(<ConfirmPasswordInputFC handleConfirm={handleConfirm} />, container);
  });
  const passwordInput = getByTestId(container, "password");
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  const confirmPasswordInput = getByTestId(container, "password_confirmation");
  fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });

  expect(handleConfirm).toHaveBeenCalledTimes(1);
});
it("reset confirm password to empty when modify password", () => {});
it("report error when confirm password is not identical", () => {});
