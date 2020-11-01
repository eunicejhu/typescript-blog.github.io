import React from "react";
import { Switch, Route, NavLink, useRouteMatch } from "react-router-dom";

import Cats from "./Cats";

function Projects() {
  const { path, url } = useRouteMatch();
  return (
    <>
      <ul>
        <li>
          <NavLink to={`${url}`}>projects</NavLink>
          <NavLink to={`${url}/cats`}>Cats</NavLink>
          <NavLink to={`${url}/countries`}>Countries</NavLink>
        </li>
      </ul>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => (
            <div>Please click project in sidebar to see more details!</div>
          )}
        />
        <Route path={`${path}/cats`}>
          <Cats />
        </Route>
        <Route path={`${path}/countries`}>
          <Countries />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

function Countries() {
  return <div>This is Countries project</div>;
}

function NotFound() {
  return <div>Projects not found</div>;
}

export default Projects;
