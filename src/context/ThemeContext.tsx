import React from "react";

const PINK = {
  color: {
    primary: {
      light: "#ffeeff",
      default: "#f8bbd0",
      dark: "#c48b9f",
    },
    secondary: {
      light: "#ffffff",
      default: "#fce4ec",
      dark: "#c9b2ba",
    },
    text: {
      primary: "#3e2723",
      secondary: "#5d4037",
    },
    bg: "#e1e2e1",
  },
  borderRadius: "4px",
};

const DARK = {
  /**TODO */
};

const LIGHT = {
  /**TODO */
};
export const themes = {
  dark: DARK,
  light: LIGHT,
  pink: PINK,
};

const ThemeContext = React.createContext<{ theme: typeof PINK; setTheme: any }>(
  {
    theme: themes.pink,
    setTheme: () => {},
  }
);

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
