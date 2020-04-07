import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";

import Register from "../register";
import Login from "../login";
import { UserProvider } from "../common/context";
import Posts from "../blog/Posts";
import Create from "../blog/Create";
import Edit from "../blog/Edit";
import history from "../common/history";
import useTitle from "../common/useTitle";
import withUserRedirect from "../common/withUserRedirect";

import HeaderButtons from "./HeaderButtons";

export function App() {
  useTitle("Posts");
  return (
    <UserProvider>
      <Router history={history}>
        <nav>
          <h1>Flaskr</h1>
          <HeaderButtons />
        </nav>
        <section className="content">
          <Switch>
            <Route path="/register" exact component={withUserRedirect(Register)} />
            <Route path="/login" exact component={withUserRedirect(Login)} />
            <Route path="/create" exact component={Create} />
            <Route path="/post/:id" exact component={Edit} />
            <Route path="/" exact component={Posts} />
            <Redirect to="/" />
          </Switch>
        </section>
      </Router>
    </UserProvider>
  );
}
