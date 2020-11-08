import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import history from "./helpers/history";
import Main from "./pages/Main/Main";
import ThemeContext, { themes } from "./context/ThemeContext";

import "./App.css";

const App = () => {
  const [theme, setTheme] = useState(themes.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CookiesProvider>
        <Router history={history}>
          <Main />
        </Router>
      </CookiesProvider>
    </ThemeContext.Provider>
  );
};
export default App;
