import React, { Component, Fragment } from "react";
import { API } from "../data";
import { Segment, Grid, Form, Button } from "semantic-ui-react";
import Navbar from "./Navbar";

class Settings extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: ""
  };

  componentDidMount() {
    fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(({ user }) => {
        this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        });
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API}/users`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(console.log)
  };

  render() {
    return (
      <Fragment>
        <Navbar active="settings" />
        <Segment>
          <Grid columns="2" centered verticalAlign="middle">
            <Grid.Column>
              <Form
                className="attached fluid segment"
                onSubmit={this.handleSubmit}
              >
                <Form.Input
                  fluid
                  type="text"
                  label="First Name"
                  placeholder="First Name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  type="text"
                  label="Last Name"
                  placeholder="Last Name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  type="text"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Grid textAlign="center">
                  <Grid.Column>
                    <Button color="black" type="submit">
                      Update
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            </Grid.Column>
            <Grid.Column textAlign="center">Hello</Grid.Column>
          </Grid>
        </Segment>
      </Fragment>
    );
  }
}

export default Settings;
