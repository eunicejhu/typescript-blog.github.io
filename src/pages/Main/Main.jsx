import React, { useContext } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Projects from "../Projects/Projects";
import Login from "../Login/Login";

import "./Main.scss";
import ThemeContext from "../../context/ThemeContext";

const ROUTES = [
  {
    to: "/",
    text: "Home",
    path: "/",
    component: <Home />,
  },
  {
    to: "/projects",
    text: "Projects",
    path: "/projects",
    component: <Projects />,
  },
  {
    to: "/aboutme",
    text: "Aboutme",
    path: "/aboutme",
    component: <AboutMe />,
  },
  {
    to: "/contactme",
    text: "Contactme",
    path: "/contactme",
    component: <ContactMe />,
  },
  {
    to: "/login",
    text: "Login",
    path: "/login",
    component: <Login />,
  },
  {
    to: null,
    text: null,
    path: null,
    component: <NotFound />,
  },
];

function Main() {
  const [cookie, setCookie] = useCookies(["isLoggedIn"]);
  const history = useHistory();
  const { theme, setTheme } = useContext(ThemeContext);

  const renderNavLinks = ROUTES.filter(({ to }) => to).map(({ to, text }) => {
    if (cookie.isLoggedIn && cookie.isLoggedIn !== "false" && to === "/login") {
      return (
        <li key={to}>
          <button
            data-testid={to}
            type="button"
            onClick={() => {
              setCookie("isLoggedIn", false, { path: "/" });
              history.replace("/");
            }}
          >
            Logout
          </button>
        </li>
      );
    }
    return (
      <li key={to}>
        <NavLink data-testid={to} to={to}>
          {text}
        </NavLink>
      </li>
    );
  });
  const renderRoutes = ROUTES.map(({ path, component }) => {
    if (path === "/") {
      return (
        <Route key={path} exact path={path}>
          {component}
        </Route>
      );
    }
    if (path == null) {
      return (
        <Route key={path}>
          <NotFound />
        </Route>
      );
    }
    return (
      <Route key={path} path={path}>
        {component}
      </Route>
    );
  });

  return (
    <>
      <header className="nav-container">
        <ul>{renderNavLinks}</ul>
        <button
          className="theme"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme}
        </button>
      </header>
      <main>
        <Switch>{renderRoutes}</Switch>
      </main>
      )
    </>
  );
}

function Home() {
  return <div>This is Home page</div>;
}

function AboutMe() {
  return <div>This is about me page</div>;
}
function ContactMe() {
  return <div>This is contact me page</div>;
}
function NotFound() {
  return <div>Page not found</div>;
}

export default Main;
