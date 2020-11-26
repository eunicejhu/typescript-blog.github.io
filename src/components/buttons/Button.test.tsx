import React from "react";
import Button from "./Button";

import { themes } from "../../context/ThemeContext";

import { render } from "@testing-library/react";
import "jest-styled-components";

it("Button test:", () => {
  const { container } = render(<Button theme={themes.pink} />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    .c0 {
      --color-default: #f8bbd0;
      --color-light: #ffeeff;
      --color-dark: #c48b9f  color:white;
      background-color: var(--color-light);
      border: 1px solid var(--color-light);
    }

    .c0:hover {
      background-color: var(--color-dark);
      border: 1px solid var(--color-dark);
    }

    <button
      class="c0"
    />
  `);
});
