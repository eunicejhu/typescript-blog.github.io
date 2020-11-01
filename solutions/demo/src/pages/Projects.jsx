import React from "react";
import { Switch, Route, NavLink, useRouteMatch } from "react-router-dom";

import Cats from "./Cats";
import Cat from "./Cat";

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
        <Route exact strict path={`${path}/cats`}>
          <Cats />
        </Route>
        <Route exact strict path={`${path}/countries`}>
          <Countries />
        </Route>
        <Route path={`${path}/cats/:id`}>
          <Cat />
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
