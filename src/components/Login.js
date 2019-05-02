import React, { Component, Fragment } from "react";
import {
  Form,
  Button,
  Message,
  Grid,
  Container,
  Header
} from "semantic-ui-react";
import Navbar from "./Navbar";
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
          localStorage.setItem("username", payload.user.username);
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
        <Navbar active="login" />
        <div style={{ height: "600px" }}>
          <Grid
            // relaxed
            divided
            textAlign="center"
            stackable
            // verticalAlign="middle"
            // centered
            columns={2}
            style={{ height: "100%" }}
          >
            <Grid.Row>
              <Grid.Column width={6} verticalAlign="middle">
                {/* <Message
              id="login-message"
              attached
              header="Welcome!"
              content="Please Log In"
            /> */}
                <Container>
                  {/* <h1 style={{ marginBottom: "30px" }}>Log In</h1> */}
                  <Header size="huge">Log In</Header>
                  <br />
                  <Form
                    // className="attached fluid segment"
                    onSubmit={this.handleSubmit}
                    onReset={this.handleReset}
                  >
                    <Form.Input
                      // fluid
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
                      // fluid
                      icon="lock"
                      iconPosition="left"
                      label="Password"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    {/* <Grid textAlign="center">
                <GridColumn> */}
                    <br />
                    <Button
                      fluid
                      color="black"
                      type="submit"
                      // style={{ marginTop: "15px" }}
                    >
                      Login
                    </Button>
                    {/* </GridColumn>
              </Grid> */}
                  </Form>
                  {this.state.errors ? (
                    <Message
                      // attached
                      error
                      header="There were errors with your submission:"
                      list={this.state.errors}
                    />
                  ) : null}
                </Container>
              </Grid.Column>
              <Grid.Column width={10}>
                <div style={{ background: "#2fcab5", height: "100%" }}>
                  <Header size="huge">Welcome Back</Header>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Login;
