import React from "react";
import { Router } from "react-router-dom";
import history from "../helpers/history";
// Hoc
const withRouter = (Component) => (props) => (
  <Router history={history}>
    <Component {...props} />
  </Router>
);

export default withRouter;
