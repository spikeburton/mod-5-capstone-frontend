import React, { Component, Fragment } from "react";
import {
  Form,
  Button,
  Segment,
  Message,
  GridColumn,
  Grid
} from "semantic-ui-react";
import Navbar from './Navbar'
import { API } from "../data";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    delete this.state.errors;

    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: this.state })
    })
      .then(response => response.json())
      .then(payload => {
        if (payload.errors) {
          this.setState({ errors: payload.errors });
        } else {
          localStorage.setItem("token", payload.jwt);
          this.props.history.push("/");
        }
      });

    e.target.reset();
  };

  handleReset = () => {
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <Fragment>
        <Navbar />
        <Segment id="login-container">
          <Message
            id="login-message"
            attached
            header="Welcome"
            content="Please Log In"
          />
          <Form
            className="attached fluid segment"
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
          >
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Username"
              placeholder="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Grid textAlign="center">
              <GridColumn>
                <Button color="black" type="submit">
                  Login
                </Button>
              </GridColumn>
            </Grid>
          </Form>
          {this.state.errors ? (
            <Message
              attached
              error
              header="There were errors with your submission:"
              list={this.state.errors}
            />
          ) : null}
        </Segment>
      </Fragment>
    );
  }
}

export default Login;
