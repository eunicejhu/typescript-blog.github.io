import React from "react";
import { Router } from "react-router-dom";
import history from "../helpers/history";

type Props = React.ReactNode;
const RouterWrapper: React.FC<Props> = ({ children }) => (
  <Router history={history}>{children}</Router>
);
