import React, { useState } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";

import Projects from "./Projects";
import Login from "./Login";

import "../styles/PortfolioPage.scss";

function useLogin() {
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();
  const login = ({ identifier, password }) => {
    setTimeout(() => {
      // API call to login}
      setIsLogged(true);
      // back to previous page
      history.goBack("/");
    }, 1000);
  };
  return [isLogged, login];
}
const ROUTES = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/projects",
    text: "Projects",
  },
  {
    to: "/aboutme",
    text: "Aboutme",
  },
  {
    to: "/contactme",
    text: "Home",
  },
  {
    to: "/login",
    text: "Login",
  },
];

function PortfolioPage() {
  const [isLogged, login] = useLogin();

  const NavLinks = () =>
    ROUTES.map(({ to, text }) => {
      if (isLogged && to === "/login") {
        return (
          <li key={to}>
            <NavLink to={to}>Logout</NavLink>
          </li>
        );
      }
      return (
        <li key={to}>
          <NavLink to={to}>{text}</NavLink>
        </li>
      );
    });
  return (
    <>
      <header className="nav-container">
        <ul>
          <NavLinks />
        </ul>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/aboutme">
            <AboutMe />
          </Route>
          <Route path="/contactme">
            <ContactMe />
          </Route>
          <Route path="/login">
            <Login cb={login} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
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

export default PortfolioPage;
