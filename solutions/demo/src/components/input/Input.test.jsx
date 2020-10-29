import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Input from "./Input";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// act(): rendering, user event

it("render a label", () => {
  act(() => {
    render(<label htmlFor="">Email</label>, container);
  });

  // label is a Node instead of HtmlElement, https://developer.mozilla.org/en-US/docs/Web/API/Node
  const label = container.querySelector("label");
  expect(label.textContent).toBe("Email");
});

it("change value when click", () => {
  const handleClick = jest.fn();
  act(() => {
    render(<Input type="button" onClick={handleClick} />, container);
  });

  const button = container.querySelector("[type = button]");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("submit when click", () => {
  const handleSubmit = jest.fn();
  act(() => {
    render(<Input type="submit" onClick={handleSubmit} />, container);
  });
  const submit = container.querySelector("input[type=submit]");
  act(() => {
    submit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

// Color Input: two events to be used to detect changes to the color value
it("change color when change or input", () => {
  const handleInput = jest.fn();
  const handleChange = jest.fn();

  act(() => {
    render(
      <Input type="color" onInput={handleInput} onChange={handleChange} />,
      container
    );
  });
  const color = container.querySelector("[type=color]");
  act(() => {
    color.dispatchEvent(new UIEvent("input", { bubbles: true }));
    color.dispatchEvent(new UIEvent("change", { bubbles: true }));
  });
  expect(handleInput).toHaveBeenCalledTimes(1); // input event can trigger onChange
  expect(handleChange).toHaveBeenCalledTimes(2);
});
