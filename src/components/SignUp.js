import React, { Component, Fragment } from "react";
import {
  Segment,
  Form,
  Grid,
  Button,
  Message,
  Container,
  Header
} from "semantic-ui-react";
import { API } from "../data";
import Navbar from "./Navbar";

class SignUp extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(payload => {
        if (payload.errors) {
          this.setState({ ...this.state, errors: payload.errors });
        } else {
          localStorage.setItem("username", payload.user.username);
          localStorage.setItem("token", payload.jwt);
          this.props.history.push("/");
        }
      });

    e.target.reset();
  };

  handleReset = () => {
    // clear password information when form resets
    this.setState({
      password: "",
      password_confirmation: ""
    });
  };

  render() {
    return (
      <Fragment>
        <Navbar active="signup" />
        {/* <Segment id="signup-container"> */}
        <div style={{ height: "600px" }}>
          <Grid
            divided
            textAlign="center"
            stackable
            columns={2}
            style={{ height: "100%" }}
          >
            <Grid.Row>
              <Grid.Column width={8} verticalAlign="middle">
                {/* <Message
            attached
            header="Welcome!"
            content="Let's get some basic information:"
          /> */}
                <Container>
                  <Header size="huge">Sign Up</Header>
                  <br />
                  <Form
                    // className="attached fluid segment"
                    onSubmit={this.handleSubmit}
                    onReset={this.handleReset}
                  >
                    <Form.Group widths="equal">
                      <Form.Input
                        fluid
                        label="First Name"
                        placeholder="First Name"
                        type="text"
                        name="first_name"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        fluid
                        label="Last Name"
                        placeholder="Last Name"
                        type="text"
                        name="last_name"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
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
                        label="Email"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
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
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        name="password_confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    {/* <Grid textAlign="center">
                      <Grid.Column> */}
                    <br />
                    <Button color="black" type="submit">
                      Sign Up
                    </Button>
                    {/* </Grid.Column>
                    </Grid> */}
                  </Form>
                  {this.state.errors ? (
                    <Message
                      attached
                      warning
                      header="There was a problem with your submission:"
                      list={this.state.errors}
                    />
                  ) : null}
                  {/* </Segment> */}
                </Container>
              </Grid.Column>
              <Grid.Column width={8}>
                <div style={{ background: "#8dd8b9", height: "100%" }}>
                  <Header size="huge">Welcome</Header>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default SignUp;
