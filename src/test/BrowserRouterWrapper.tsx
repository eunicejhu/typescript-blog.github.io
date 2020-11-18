import React from "react";
import { BrowserRouter } from "react-router-dom";

type Props = { children?: React.ReactNode };
const BrowserRouterWrapper: React.FC<Props> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default BrowserRouterWrapper;
