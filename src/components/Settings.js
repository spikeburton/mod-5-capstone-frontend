import React, { Component, Fragment } from "react";
import { API } from "../data";
import { Segment, Grid, Form, Button, Message } from "semantic-ui-react";
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

    fetch(`${API}/settings`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(json => {
        if (json.errors) this.setState({ errors: json.errors });
        else this.props.history.push("/");
      });
  };

  handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure? This action cannot be reversed!"
    );
    if (confirmation) {
      fetch(`${API}/purge`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(response => {
        if (response.ok) {
          window.alert(
            "We're sad to see you go! Your account has been deleted."
          );
          localStorage.clear();
          this.props.history.push("/signup");
        }
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Navbar active="settings" />
        <Segment attached id="settings-container">
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
                  type="email"
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
            <Grid.Column textAlign="center">
              <Button negative onClick={this.handleDelete}>
                Delete Account
              </Button>
            </Grid.Column>
          </Grid>
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

export default Settings;
