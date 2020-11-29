import React from "react";
import Button from "./Button";

import { themes } from "../../context/ThemeContext";

import { render } from "@testing-library/react";
import "jest-styled-components";

it("Button test:", () => {
    const { container } = render(<Button themes={themes} mode={"pink"} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
        .c0 {
          --btn-text-hover: rgba(255,255,255,0.8);
          --btn-bg-hover: rgba(196,139,159,0.8);
          --color-disabled: rgba(196,139,159,0.4);
          --color-disabled-bg: rgba(196,139,159,0.2);
          --color-bg: rgba(255,255,255,1);
          --color-text: rgba(196,139,159,1);
          --color-border: rgba(196,139,159,1);
          --border-radius: 4px;
          --transition: all 0.2s;
          --spacing: 10px;
          color: var(--color-text);
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          -webkit-transition: var(--transition);
          transition: var(--transition);
          padding: var(--spacing);
        }

        .c0:hover {
          color: var(--btn-text-hover);
          cursor: pointer;
          background-color: var(--btn-bg-hover);
          border: 1px solid var(--btn-text-hover);
        }

        .c0:disabled {
          color: var(--color-disabled);
          cursor: not-allowed;
          background-color: var(--color-disabled-bg);
          border: 1px solid var(--color-disabled);
        }

        <button
          class="c0"
          mode="pink"
        />
    `);
});
