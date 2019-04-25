import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div id="app-container">
        <Router>
            <Switch>
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/signup"} component={SignUp} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
