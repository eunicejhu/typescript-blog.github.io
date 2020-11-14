import React from "react";
import { Route, Switch } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage";

const PostsList = () => <>Posts</>;
const Cats = () => <>Cats</>;
const NoMatch = () => <>No match</>;
const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PostsList />
    </Route>
    <Route path="/cats">
      <Cats />
    </Route>
    <Route path="/posts/:id">
      <SinglePostPage />
    </Route>
    <Route>
      <NoMatch />
    </Route>
  </Switch>
);
export default Routes;
