import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import history from "./helpers/history";
import PortfolioPage from "./pages/PortfolioPage";
import ThemeContext, { themes } from "./context/ThemeContext";

import "./styles/App.css";

const App = () => {
  const [theme, setTheme] = useState(themes.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CookiesProvider>
        <Router history={history}>
          <PortfolioPage />
        </Router>
      </CookiesProvider>
    </ThemeContext.Provider>
  );
};
export default App;
