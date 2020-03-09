import React from "react";
import { Route, Router } from "react-router-dom";
import { renderApp } from "../common/helpers";
import Register from "../register";
import Login from "../login";

import { UserProvider } from "../common/context";

import "./css/style.css";
import Posts from "../blog/Posts";
import Create from "../blog/Create";
import Edit from "../blog/Edit";
import HeaderButtons from "./headerButtons";
import history from "../common/history";
import Title from "../common/Title";

function App() {
  return (
    <UserProvider>
      <Title title="Posts" />
      <Router history={history}>
        <nav>
          <h1>Flaskr</h1>
          <HeaderButtons />
        </nav>
        <section className="content">
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/create" exact component={Create} />
          <Route path="/post/:id" exact component={Edit} />
          <Route path="/" exact component={Posts} />
        </section>
      </Router>
    </UserProvider>
  );
}

renderApp(App);
