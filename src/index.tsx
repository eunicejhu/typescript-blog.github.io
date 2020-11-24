import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import ThemeContext, { themes } from "./context/ThemeContext";
import store from "./store/index";

import App from "./App";
import "./index.css";
import { makeServer } from "./server";
if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const Entry = () => {
  const [theme, setTheme] = useState(themes.dark);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CookiesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};

ReactDOM.render(<Entry />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
