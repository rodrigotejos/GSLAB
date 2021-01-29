import "./App.scss";
//react imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import of components
import MainPage from "./containers/MainPage/MainPage";
import Login from "./containers/LoginPage/LoginPage";
import EditPage from "./containers/EditPage/EditPage";
import AdicionarPage from "./containers/AdicionarPage/AdicionarPage";

//import css
import "./index.scss";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/edit">
          <EditPage />
        </Route>
        <Route exact path="/adicionar">
          <AdicionarPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
