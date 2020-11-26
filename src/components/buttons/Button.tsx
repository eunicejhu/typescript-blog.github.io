import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ variant: string }>`
  ${(props) => {
    return `--color-default:  ${props.theme.color[props.variant].default};
  --color-light: ${props.theme.color[props.variant].light} ;
  --color-dark: ${props.theme.color[props.variant].dark} `;
  }}

  color: white;
  background-color: var(--color-light);
  border: 1px solid var(--color-light);

  &:hover {
    background-color: var(--color-dark);
    border: 1px solid var(--color-dark);
  }
`;

const Button: React.FC<{ children?: React.ReactNode; [p: string]: any }> = ({
  children,
  variant = "primary",
  ...props
}) => (
  <StyledButton {...props} variant={variant}>
    {children}
  </StyledButton>
);

export default Button;
