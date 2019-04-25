import React, { Component } from "react";
import { Segment, Form, Grid, Button, Message } from "semantic-ui-react";
import { API } from "../data";

class SignUp extends Component {
  state = {
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
    console.log(e.target);

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
        }
      });
  };

  render() {
    return (
      <Segment id="signup-container">
        <Message attached header="Welcome!" content="Let's get some basic information:" />
        <Form className="attached fluid segment" onSubmit={this.handleSubmit}>
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
          <Grid textAlign="center">
            <Grid.Column>
              <Button color="black" type="submit">
                Sign Up
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
        {this.state.errors ? (
          <Message
            attached
            warning
            header="There was a problem with your submission:"
            list={this.state.errors}
          />
        ) : null}
      </Segment>
    );
  }
}

export default SignUp;
