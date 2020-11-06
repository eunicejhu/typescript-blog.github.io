import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import history from "../helpers/history";

const renderInRouter = (Component) => {
  render(
    <Router history={history}>
      <Component />
    </Router>
  );
};
export default renderInRouter;
