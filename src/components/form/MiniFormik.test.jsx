import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SuperPoweredForm from "./MiniFormik";

test("type firstname to show firstname", () => {
  const { getByPlaceholderText } = render(<SuperPoweredForm />);
  const firstNameInput = getByPlaceholderText(/firstname/i);
  fireEvent.change(firstNameInput, { target: { value: "isabella" } });
  expect(firstNameInput.value).toBe("isabella");
});
test("show required Error when submit without filling firstname", () => {
  const { getByDisplayValue, getByText, getByPlaceholderText } = render(
    <SuperPoweredForm />
  );
  const submitButton = getByDisplayValue(/submit/i);
  const firstNameInput = getByPlaceholderText(/firstname/i);
  fireEvent.change(firstNameInput, { target: { value: "isabella" } });
  fireEvent.submit(submitButton);
  expect(getByText(/Required lastname/i)).toBeInTheDocument();
});
