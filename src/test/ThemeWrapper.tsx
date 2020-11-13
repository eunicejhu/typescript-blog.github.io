import React from "react";
import ThemeContext, { themes } from "../context/ThemeContext";
export const theme = { theme: themes.dark, setTheme: jest.fn() };

type Props = { children: React.ReactNode };
const ThemeWrapper: React.FC<Props> = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
export default ThemeWrapper;
