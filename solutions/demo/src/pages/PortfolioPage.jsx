import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

function PortfolioPage() {
  return (
    <>
      <header>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="projects">Projects</NavLink>
            <NavLink to="/aboutme">About me</NavLink>
            <NavLink to="/contactme">Contact me</NavLink>
          </li>
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
function Projects() {
  return <div>This is Projects page</div>;
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
