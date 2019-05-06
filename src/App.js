import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainContainer from "./containers/MainContainer";
import Settings from "./components/Settings";
import DriveCreationContainer from "./containers/DriveCreationContainer";

class App extends Component {
  render() {
    return (
      <div id="app-container">
        <Router>
          <Switch>
            <Route exact path={"/"} component={MainContainer} />
            <Route
              exact
              path={"/create"}
              render={props =>
                localStorage.getItem("token") ? (
                  <DriveCreationContainer {...props} />
                ) : (
                  <Redirect to="/login" {...props} />
                )
              }
            />
            <Route
              exact
              path={"/settings"}
              render={props =>
                localStorage.getItem("token") ? (
                  <Settings {...props} />
                ) : (
                  <Redirect to="/login" {...props} />
                )
              }
            />
            <Route
              exact
              path={"/login"}
              render={props =>
                localStorage.getItem("token") ? (
                  <Redirect to="/" {...props} />
                ) : (
                  <Login {...props} />
                )
              }
            />
            <Route
              exact
              path={"/signup"}
              render={props =>
                localStorage.getItem("token") ? (
                  <Redirect to="/" {...props} />
                ) : (
                  <SignUp {...props} />
                )
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
