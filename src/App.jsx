import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import history from "./helpers/history";
import PortfolioPage from "./pages/PortfolioPage";

import "./styles/App.css";

const App = () => (
  <CookiesProvider>
    <Router history={history}>
      <PortfolioPage />
    </Router>
  </CookiesProvider>
);
export default App;
