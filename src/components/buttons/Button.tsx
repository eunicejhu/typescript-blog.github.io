import React from "react";
import styled from "styled-components";
import { Themes, Mode } from "../../context/ThemeContext";

const StyledButton = styled.button<ButtonProps>`
    ${({ themes, mode }: ButtonProps) => {
        return `
            --btn-text-hover:  ${themes[mode].btnTextHover};
            --btn-bg-hover: ${themes[mode].btnBackgroundHover};
            --color-disabled: ${themes[mode].disabled} ;
            --color-disabled-bg: ${themes[mode].disabledBackground} ;
            --color-bg: ${themes[mode].background} ;
            --color-text:${themes[mode].text};
            --color-border: ${themes[mode].btnBorder} ;
            --border-radius: ${themes[mode].borderRadius};
            --transition: ${themes[mode].transition};
            --spacing: ${themes[mode].spacing};
        `;
    }}
    color: var(--color-text);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    transition: var(--transition);
    padding: var(--spacing);

    &:hover {
        color: var(--btn-text-hover);
        cursor: pointer;
        background-color: var(--btn-bg-hover);
        border: 1px solid var(--btn-text-hover);
    }

    &:disabled {
        color: var(--color-disabled);
        cursor: not-allowed;
        background-color: var(--color-disabled-bg);
        border: 1px solid var(--color-disabled);
    }
`;

export interface ButtonProps {
    children?: React.ReactNode;
    themes: Themes;
    mode: Mode;
    [p: string]: any;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
