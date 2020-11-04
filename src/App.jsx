import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import PortfolioPage from "./pages/PortfolioPage";

import "./styles/App.css";

const App = () => (
  <CookiesProvider >
  <Router>
    <PortfolioPage />
  </Router>
  </CookiesProvider>
);
export default App;
