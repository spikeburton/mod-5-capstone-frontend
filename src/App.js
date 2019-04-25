import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div id="app-container">
        <Router>
          <Switch>
            <Route exact path={"/login"} component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
