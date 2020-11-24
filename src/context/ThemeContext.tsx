import React from "react";

export const themes = {
  dark: "dark",
  light: "light",
};

const ThemeContext = React.createContext<{ theme: string; setTheme: any }>({
  theme: themes.dark,
  setTheme: () => {},
});

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
