import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";

import "./styles/App.css";

const App = () => (
  <Router>
    <PortfolioPage />
  </Router>
);
export default App;
