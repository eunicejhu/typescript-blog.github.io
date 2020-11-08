import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import history from "../helpers/history";
import ThemeContext from "../context/ThemeContext";

export const theme = { theme: "dark", setTheme: jest.fn() };
const renderInRouter = (Component) => {
  return render(
    <ThemeContext.Provider value={theme}>
      <Router history={history}>
        <Component />
      </Router>
    </ThemeContext.Provider>
  );
};
export default renderInRouter;
