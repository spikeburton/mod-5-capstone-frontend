import React, { Component, Fragment } from "react";
import { API } from "../data";
import {
  Segment,
  Grid,
  Form,
  Button,
  Message,
  Container,
  Image
} from "semantic-ui-react";
import Navbar from "./Navbar";

class Settings extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    avatar_file: null,
    avatar_url: ""
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

  handleUpload = () => {
    const file = this.avatarInput.files[0];

    fetch(`${API}/signed_s3`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const url = data.url;
        const formData = new FormData();

        Object.keys(data.form_data).forEach(key =>
          formData.append(key, data.form_data[key])
        );
        formData.append("file", file);

        fetch(url, {
          method: "POST",
          body: formData
        })
          .then(response => response.text())
          .then(str => {
            const imageURL = new DOMParser().parseFromString(
              str,
              "application/xml"
            );
            this.setState({
              avatar_file: null,
              avatar_url: imageURL.getElementsByTagName("Location")[0]
                .textContent
            });
          });
      });
  };

  render() {
    return (
      <Fragment>
        <Navbar active="settings" />
        <Segment attached id="settings-container">
          <Grid columns="2" verticalAlign="middle" stackable>
            <Grid.Column>
              <Container>
                <Form
                  // className="attached fluid segment"
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
              </Container>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <input
                type="file"
                name="avatar_file"
                hidden
                ref={el => (this.avatarInput = el)}
                onChange={this.handleChange}
              />
              {this.state.avatar_file ? (
                <Message header={this.avatarInput.files[0].name} />
              ) : null}
              {this.state.avatar_url ? (
                <Image
                  src={this.state.avatar_url}
                  // avatar
                  // circular
                  size="small"
                  centered
                />
              ) : null}
              <Button
                content="Choose File"
                icon="image"
                color="black"
                onClick={() => this.avatarInput.click()}
              />
              <Button color="black" onClick={this.handleUpload}>
                UPLOAD
              </Button>
              <Button negative onClick={this.handleDelete}>
                Delete Account
              </Button>
            </Grid.Column>
          </Grid>
          {this.state.errors ? (
            <Message
              // attached
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
