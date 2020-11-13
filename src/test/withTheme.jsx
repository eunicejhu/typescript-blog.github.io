import React from "react";
import ThemeContext, { themes } from "../context/ThemeContext";

export const theme = { theme: themes.dark, setTheme: jest.fn() };

const withTheme = (Component) => (props) => (
  <ThemeContext.Provider value={theme}>
    <Component {...props} />
  </ThemeContext.Provider>
);

export default withTheme;
