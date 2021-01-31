import "./App.scss";
//react imports
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookie from "js-cookie";

//import of components
import MainPage from "./containers/MainPage/MainPage";
import Login from "./containers/LoginPage/LoginPage";
import EditPage from "./containers/EditPage/EditPage";
import AdicionarPage from "./containers/AdicionarPage/AdicionarPage";
import CreateUserPage from "./containers/CreateUserPage/CreateUserPage";

//import css
import "./index.scss";

const App = () => {
  const jwt = Cookie.get("token");
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        jwt ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create">
          <CreateUserPage />
        </Route>
        <PrivateRoute exact path="/" component={() => <MainPage />} />
        <PrivateRoute exact path="/edit" component={() => <EditPage />} />
        <PrivateRoute
          exact
          path="/adicionar"
          component={() => <AdicionarPage />}
        />
        {/*<Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/edit">
          <EditPage />
        </Route>
        <Route exact path="/adicionar">
          <AdicionarPage />
  </Route>*/}
      </Switch>
    </Router>
  );
};

export default App;
