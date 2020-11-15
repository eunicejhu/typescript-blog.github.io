import React from "react";
import { Route, Switch } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage";
import PostsList from "./features/posts/PostsList";
import EditPostForm from "./features/posts/EditPostForm";

const Cats = () => <>Cats</>;
const NoMatch = () => <>No match</>;
const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PostsList />
    </Route>
    <Route exact path="/cats">
      <Cats />
    </Route>
    <Route exact path="/posts/:id">
      <SinglePostPage />
    </Route>
    <Route exact path="/posts/edit/:id">
      <EditPostForm />
    </Route>
    <Route>
      <NoMatch />
    </Route>
  </Switch>
);
export default Routes;
