import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from "./containers/welcome";
import Login from "./containers/login";
import Register from "./containers/register";
import UploadFile from "./containers/uploadFile";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Welcome />
        <Switch>
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/uploadFile"} component={UploadFile} />
        </Switch>
      </Router>
    );
  }
}
